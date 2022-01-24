const {Service} = require('moleculer');
const {UwsServer} = require('../mixins/uws.mixin');
const appConfig = require('../config/app.config');

const TrafficController = require('../controllers/traffic-controller');

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
    this.addRoute({
      path: '/', method: 'get', controller: 'home', action: 'index',
    });
  
    this.getServerUws().get('/t/:id', async (res, req) => {
      let controller = new TrafficController({
        broker: this.broker, res, req
      })
      controller.index();
    });
    
  }
  
}

module.exports = AppService;