const {AbstractController} = require('node-moleculer-web');
const crypto = require('crypto');
const JWT = require('../utils/jwt');

class AuthController extends AbstractController {
  
  /*async login() {
    return await this.callRestAction('user.model.login');
  }
  
  async register() {
   return await this.callRestAction('user.model.register');
  }*/

}

module.exports = AuthController;