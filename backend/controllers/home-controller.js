const AbortController = require('./abstract-controller');

class HomeController extends AbortController {
  index() {
    this.renderString(
      'home controller welcome <a href="/index.html">index.html</a>');
  }
  
}

module.exports = HomeController;