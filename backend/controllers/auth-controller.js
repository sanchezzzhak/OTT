const AbstractController = require('./abstract-controller');
const crypto = require('crypto');

class AuthController extends AbstractController {

  
  
  
  async login() {
    
    if (this.req.getMethod() === 'options') {
      this.end('');
      return;
    }
    try {
      let content = await this.readBody();
      let json = JSON.parse(content.toString());

      try {
        let response = await this.broker.call('user.model.login', json)
        return this.asJson(response);
      } catch (e){
        if (e.type === 'VALIDATION_ERROR') {
          return this.asJson({err: 'Validation error', errors: e.data})
        }
      }
    } catch (e) {
      this.broker.logger.error(e);
    }

    return this.asJson({err: 'Invalid JSON format'}, 403);
  }
  
  async register() {
    if (this.req.getMethod() === 'options') {
      this.end('');
      return;
    }
    
    try {
      let content = await this.readBody();
      let json = JSON.parse(content.toString());
      
      try {
        let response = await this.broker.call('user.model.register', json)
        return this.asJson(response);
      } catch (e){
        if (e.type === 'VALIDATION_ERROR') {
          return this.asJson({err: 'Validation error', errors: e.data})
        }
      }
    } catch (e) {
      this.broker.logger.error(e);
    }
  
    return this.asJson({err: 'Invalid JSON format'}, 403);
    
  }
  

}

module.exports = AuthController;