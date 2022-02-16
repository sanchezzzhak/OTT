const ejs = require('ejs');
const fs = require('fs');
const {getMime} = require('./../utils/mime');

/**
 * callback async read post data for chunks
 * @param res
 * @param cb
 * @param err
 * @private
 */
const __readBody = (res, cb, err) => {
  let buffer;
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab);
    if (isLast) {
      if (buffer) {
        cb(Buffer.concat([buffer, chunk]));
        return;
      }
      cb(chunk);
      return;
    }
    
    if (buffer) {
      buffer = Buffer.concat([buffer, chunk]);
      return;
    }
    buffer = Buffer.concat([chunk]);
    return;
  });
  
  /* Register error cb */
  res.onAborted(err);
};

class AbstractController {
  format = 'html';
  statusCode = 200;
  
  constructor(opts = {}) {
    this.broker = opts.broker;
    this.req = opts.req;
    this.res = opts.res;
    this.route = opts.route ?? {};
    
    this.res.onAborted(() => {
      this.res.aborted = true;
    });
  }
  
  /**
   * remove unnecessary information from the validators from the array
   * @param listErrors
   * @returns {[]}
   */
  compactErrors(listErrors) {
    const errors = [];
    listErrors.map((error) => {
      let {field, message} = error;
      errors.push({field, message});
    });
    return errors;
  }
  
  /**
   * output server content (format json)
   * @param {{}} obj
   * @param {number} statusCode
   */
  asJson(obj, statusCode = 200) {
    this.renderRaw({view: JSON.stringify(obj), statusCode, format: 'json'});
  }
  
  /**
   * final response to the server
   * @param context
   */
  end(context) {
    if (!this.res.aborted) {
      this.res.end(context);
    }
  }
  
  /**
   * request to microservices models, while for post requests
   * @param {string} actionName
   * @returns {Promise<void>}
   */
  async callRestAction(actionName) {
    if (this.req.getMethod() === 'options') {
      this.end('');
      return;
    }
    
    try {
      let content = await this.readBody();
      let json = JSON.parse(content.toString());
      
      try {
        let response = await this.broker.call(actionName, json);
        return this.asJson(response);
      } catch (e) {
        if (e.type === 'VALIDATION_ERROR') {
          const errors = this.compactErrors(e.data);
          return this.asJson({err: 'Validation error', errors});
        }
      }
    } catch (e) {
      this.broker.logger.error(e);
    }
    
    return this.asJson({err: 'Invalid JSON format'}, 403);
  }
  
  /**
   * read post data in body
   * @returns {Promise<unknown>}
   */
  readBody() {
    return new Promise((resolve, reject) => {
      __readBody(this.res, resolve, reject);
    });
  }
  
  /**
   * output server content
   * @param {string} view
   * @param {string|number|null} statusCode
   * @param {string|null} format
   */
  renderRaw({view, statusCode, format} = {}) {
    if (format === void 0) {
      format = this.format;
    }
    if (format) {
      !this.res.aborted &&
      this.res.writeHeader('content-type', getMime('.' + format));
    }
    if (statusCode === void 0) {
      statusCode = this.statusCode;
    }
    if (statusCode) {
      !this.res.aborted && this.res.writeStatus('' + statusCode);
    }
    this.end(view);
  }
  
  /**
   * output server content (prepare ejs template+params)
   * @param template
   * @param params
   * @param statusCode
   * @param format
   */
  render({template, params, statusCode, format} = {}) {
    this.renderRaw({
      view: ejs.render(template, params), statusCode, format,
    });
  }
  
}

module.exports = AbstractController;
