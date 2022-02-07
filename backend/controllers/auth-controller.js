const AbstractController = require('./abstract-controller');

class AuthController extends AbstractController {

  async login() {

    this.setCorsHeaders();
    if (this.req.getMethod() === 'options') {
      this.end('');
      return;
    }

    try {
      let content = await this.readBody();
      let json = JSON.parse(content.toString());
      console.log(json)
    } catch (e) {
      this.renderRaw('Invalid json format', 403, 'json');
      return;
    }

    this.end('OK');
  }

}

module.exports = AuthController;