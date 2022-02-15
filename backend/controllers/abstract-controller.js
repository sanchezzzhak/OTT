const ejs = require('ejs');
const fs = require('fs');
const {getMime} = require('./../utils/mime');

const __readBody = (res, cb, err) => {
  let buffer;
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab);
    if (isLast) {
      if (buffer) {
        cb(Buffer.concat([buffer, chunk]))
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
  })

  /* Register error cb */
  res.onAborted(err);
}

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

  setCorsHeaders() {
    this.res.writeHeader("Access-Control-Allow-Origin", "*");
    this.res.writeHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    this.res.writeHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
    this.res.writeHeader("Access-Control-Max-Age", "3600");
  }

  compactErrors(listErrors){
    const errors = [];
    listErrors.map((error) => {
      let {field, message} = error;
      errors.push({field, message});
    })
    return errors;
  }
  
  asJson(obj, statusCode = 200){
    this.renderRaw({view: JSON.stringify(obj), statusCode, format: 'json'});
  }

  end(context) {
    if (!this.res.aborted) {
      this.res.end(context);
    }
  }

  readBody() {
    return new Promise((resolve, reject) => {
      __readBody(this.res, resolve, reject)
    })
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
      !this.res.aborted && this.res.writeHeader('content-type', getMime('.' + format));
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
   * @param {string} template
   * @param {*} params
   * @param {string|number|null} statusCode
   * @param {string|null} format
   */
  render({template, params, statusCode, format} = {}) {
    this.renderRaw({
      view: ejs.render(template, params), statusCode, format,
    });
  }

}

module.exports = AbstractController;
