const {Service} = require('moleculer');
const {UwsServer} = require('../mixins/uws.mixin');
const appConfig = require('../../config/app.config');

class AppService extends Service {
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'app',
      mixins: [
        UwsServer({config: appConfig}),
      ],
      started: this.start,
    });
  }
  
  start() {
    // native uws routers
    this.getServerUws().get('/t/:id', async (res, req) => {
      return this.runControllerAction('traffic', 'index', res, req);
    });

    this.getServerUws().any('/login', async (res, req) => {
      return this.runControllerAction('auth', 'login', res, req);
    });
    
    this.getServerUws().any('/register', async (res, req) => {
      return this.runControllerAction('auth', 'register', res, req);
    });
  }
  
}

module.exports = AppService;