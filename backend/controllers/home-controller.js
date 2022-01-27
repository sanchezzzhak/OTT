const AbortController = require('./abstract-controller');

class HomeController extends AbortController {
  index() {
    this.renderRaw({
      view: '<html><body>controller welcome <a href="/index.html">index.html</a></body></html>',
      format: null
    });
  }
  
}

module.exports = HomeController;