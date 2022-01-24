const AbortController = require('./abstract-controller');
const {randomUUID} = require('crypto');

class TrafficController extends AbortController {
  index() {
    let id = this.req.getParameter(0);
    let data = JSON.stringify({
      trafficId: randomUUID(), // this.broker.generateUid()
    });
    this.renderString(`window['_ott_${id}'] = ${data}`);
    
  }
  
}

module.exports = TrafficController;