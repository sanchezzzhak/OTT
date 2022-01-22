const {Service} = require('moleculer');
const {UwsServer} = require('../mixins/uws.mixin');
const appConfig = require('../config/app.config');

class AppService extends Service {
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'app',
      mixins: [
        UwsServer({config: appConfig})
      ],
      started: this.start,
    });
  }

  start(){

  }


}


module.exports = AppService;