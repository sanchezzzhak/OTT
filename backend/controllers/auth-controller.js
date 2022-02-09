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

      try {
        let response = await this.broker.call('user.model.login', {
          email, password
        })
        return this.asJson(response);
      } catch (e){
        if (e.type === 'VALIDATION_ERROR') {
          return this.asJson({err: 'Validation error', data: e.data})
        }
      }
    } catch (e) {
      this.broker.logger.error(e);
    }

    return this.asJson({err: 'Invalid JSON format'}, 403);
  }

}

module.exports = AuthController;