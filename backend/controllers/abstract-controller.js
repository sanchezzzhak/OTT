const ejs = require('ejs');
const fs = require('fs');
const {getMime} = require('./../utils/mime');


class AbstractController {
  format = 'html';
  statusCode = 200;
  
  constructor(opts = {}) {
    this.broker = opts.broker;
    this.req = opts.req;
    this.res = opts.res;
    this.route = opts.route ?? {};
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
      this.res.writeHeader('content-type', getMime('.' + format));
    }
    if (statusCode === void 0) {
      statusCode = this.statusCode;
    }
    if (statusCode) {
      this.res.writeStatus('' + statusCode);
    }
    this.res.end(view);
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
