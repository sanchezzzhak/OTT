const ejs = require('ejs');

class AbstractController {
  layout = 'html';
  statusCode = 200;
  
  constructor(opts = {}) {
    this.broker = opts.broker;
    this.req = opts.req;
    this.res = opts.res;
  }
  
  renderString(template, params) {
    this.res.writeStatus('' + this.statusCode);
    this.res.end(ejs.render(template, params));
  }
  
  render(view, params) {
    let template = '';
    this.renderString(template, params);
  }
  
}

module.exports = AbstractController;
