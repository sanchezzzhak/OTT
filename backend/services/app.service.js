const {Service} = require('moleculer');
const {UwsServer} = require('../mixins/uws.mixin');
const appConfig = require('../../config/app.config');

const ROUTERS = [
  // traffic save
  {path: '/t/:id', controller: 'traffic', action: 'index', method: 'get'},
  // frontend UI
  {path: '/login', controller: 'auth', action: 'login', method: 'any'},
  {path: '/register', controller: 'auth', action: 'register', method: 'any'},
  {
    path: '/setting/update',
    controller: 'setting',
    action: 'update',
    method: 'any',
  },
];

class AppService extends Service {
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'app',
      mixins: [
        UwsServer({config: appConfig}),
      ],
      started: this.startedService,
    });
  }
  
  /**
   * bind native uws routers for array
   */
  startedService() {
    ROUTERS.forEach((route) => {
      if (route.method === 'get') {
        this.getServerUws().get(route.path, async (res, req) => {
          return this.runControllerAction(route.controller, route.action, res,
            req);
        });
      }
      if (route.method === 'any') {
        this.getServerUws().any(route.path, async (res, req) => {
          return this.runControllerAction(route.controller, route.action, res,
            req);
        });
      }
    });
  }
  
}

module.exports = AppService;