const {Service} = require('moleculer');
const {UwsServer} = require('node-moleculer-web');
const {resolve} = require('path');

const TrafficController = require('../controllers/traffic-controller');
const AuthController = require('../controllers/auth-controller');
const ProjectController = require('../controllers/project-controller');
const PingController = require('../controllers/ping-controller');
const SettingController = require('../controllers/setting-controller');

const ServiceSettings = {
  port: process.env.SERVER_PORT ?? 3000,
  ip: process.env.SERVER_IP ?? 'localhost',
  portSchema: process.env.SERVER_PORT_SCHEMA ?? 'none',
  publicDir: resolve(__dirname + '/../../../public'),
  publicIndex: 'index.html',
  controllers: {
    // backend api
    traffic: TrafficController,
    ping: PingController,
    // frontend api
    auth: AuthController,
    setting: SettingController,
    project: ProjectController,
  },
};

class AppService extends Service {
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'app',
      mixins: [
        UwsServer
      ],
      settings: ServiceSettings,
      created: this.createService,
    });
  }
  
  /**
   * bind native uws routers for array
   */
  createService() {
    // traffic save
    this.createRoute('get /t/:id #c:traffic.save');
    // dashboard UI api
    this.createRoute('any /login #c:auth.login');
    this.createRoute('any /register #c:auth.register');
    this.createRoute('any /setting/update #c:setting.update');

    this.bindRoutes();
  }
  
}

module.exports = AppService;