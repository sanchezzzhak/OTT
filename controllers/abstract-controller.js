
class AbstractController {
  constructor(opts = {}) {
    this.broker = opts.broker;
    this.req = opts.req;
    this.res = opts.res;
  }

  render(view, params) {

  }



}

module.exports = AbstractController;
