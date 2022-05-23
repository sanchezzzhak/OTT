const AbstractController = require('./abstract-controller');
const {randomUUID} = require('crypto');

const EVENTS = {
  HIT: 1,         // the very first click or lucky, start started
  HEAT: 7         // event for heat map graph
};

class TrafficController extends AbstractController {
  
  /**
   * main method for analytics
   * result traffic id for fist request
   */
  async index() {
    this.setCorsHeadersOver();
    this.setClientHintsHeaders();
  
    let trafficId = randomUUID();
    let result = await this.#pushBuffer()
    
    let id = this.req.getParameter(0);
    let data = JSON.stringify({
      trafficId, // this.broker.generateUid()
    });
    
    this.renderRaw({view: `window['_ott_${id}'] = ${data}`, format: 'js'});
  }
  
  /**
   * get device detect for
   * @returns {Promise<void>}
   */
  async deviceInfo() {
    let useragent = this.getUserAgent();
    let headers = this.getClientHintHeaders();
  
    return await this.broker.callRestAction('detector.detect', {
      useragent, headers
    });
  }
  
  /**
   * save traffic data for buffer table
   *
   * @param params
   * @returns {Promise<null|void>}
   */
  async #pushBuffer(params = {}) {
    let eventId = params.event ?? 0;
    if (!eventId) {
      return null;
    }
    
    // detect device only for EVENTS.HIT
    let deviceInfo = {};
    if (eventId === EVENTS.HIT) {
      deviceInfo = await this.deviceInfo();
    }

    return await this.broker.callRestAction('stat.buffer', params);
  }
  
  
  /**
   * aggregate traffic by trafficId save to buffer table
   * for further analysis
   */
  async log() {
    this.setCorsHeadersOver();
    this.setClientHintsHeaders();
    
    // todo adds - save traffic for buffer table
  }
  
}

module.exports = TrafficController;