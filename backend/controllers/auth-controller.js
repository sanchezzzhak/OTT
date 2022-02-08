const AbstractController = require('./abstract-controller');
const crypto = require('crypto');

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
      let email = json.email;
      let password = json.password;

      let response = await this.broker.call('user.model.login', {
        email, password
      })
      console.log(response);




    } catch (e) {
      this.renderRaw({view: 'Invalid json format', statusCode: 403, format: 'json'});
      return;
    }

    this.end('OK');
  }

}

module.exports = AuthController;