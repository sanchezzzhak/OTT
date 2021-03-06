const AbstractController = require('./abstract-controller');
const crypto = require('crypto');

class AuthController extends AbstractController {
  
  async login() {
    return await this.callRestAction('user.model.login');
  }
  
  async register() {
   return await this.callRestAction('user.model.register');
  }

}

module.exports = AuthController;