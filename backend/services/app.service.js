const {Service} = require('moleculer');
const {UwsServer} = require('../mixins/uws.mixin');
const appConfig = require('../../config/app.config');

const excludeControllers = [
  'traffic'
];

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
    this.getServerUws()
    .get('/t/:id', async (res, req) => {
      return this.runControllerAction(
        'traffic',
        'index',
        res,
        req,
      );
    });
  }
  
}

module.exports = AppService;