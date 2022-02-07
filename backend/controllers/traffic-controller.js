const AbstractController = require('./abstract-controller');
const {randomUUID} = require('crypto');

class TrafficController extends AbstractController {
  index() {
    let id = this.req.getParameter(0);
    let data = JSON.stringify({
      trafficId: randomUUID(), // this.broker.generateUid()
    });
    this.renderRaw({view: `window['_ott_${id}'] = ${data}`, format: 'js'});
    
  }
  
}

module.exports = TrafficController;