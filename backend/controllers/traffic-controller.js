const AbstractController = require('./abstract-controller');
const {randomUUID} = require('crypto');

class TrafficController extends AbstractController {
  
  /**
   * main method for analytics
   * result traffic id for fist request
   */
  index() {
    let id = this.req.getParameter(0);
    let data = JSON.stringify({
      trafficId: randomUUID(), // this.broker.generateUid()
    });
    this.renderRaw({view: `window['_ott_${id}'] = ${data}`, format: 'js'});
  }
  
  /**
   * aggregate traffic by trafficId save to buffer table
   * for further analysis
   */
  log() {
    // todo adds - save traffic for buffer table
  }
  
}

module.exports = TrafficController;