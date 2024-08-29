const {AbstractController} = require('node-moleculer-web');
const {randomUUID} = require('crypto');

const EVENTS = {
  HIT: 1,          // the very first click or lucky, start started
  HEAT: 7,         // event for heat map graph
};

const ACTIONS = {
  INIT: 'init',
  EVENT: 'event'
};

class Traffic extends AbstractController {

  #actionInit() {
    const trafficId = randomUUID();
    const id = this.req.getParameter(0);
    const data = JSON.stringify({
      trafficId, // this.broker.generateUid()
    });

    return this.renderRaw({view: `window['_ott_${id}'] = ${data}`, format: 'js'});
  }

  #actionEvent() {
    return '';
  }

  /**
   * main method for analytics
   * result traffic id for fist request
   */
  async index() {
    this.setCorsHeaders();
    this.setClientHintsHeaders();
    if (this.req.getMethod() === 'options') {
      return '';
    }

    this.initRequest();

    const action = this.requestData.query.a ?? '';
    switch (action) {
      case 'init':
        return this.#actionInit();
      case 'event':
        return this.#actionEvent();
    }

    return '';

    /*
  let result = await this.#pushBuffer({
    trafficId,
    event: EVENTS.HIT,
  });

*/

  }

  async hot() {
    this.setCorsHeaders();
    this.setClientHintsHeaders();
    if (this.req.getMethod() === 'options') {
      return '';
    }


  }

  
  /**
   * detect device, client, os or bot
   * @returns {Promise<void>}
   */
  async trafficDeviceInfo() {
  /*  let useragent = this.getUserAgent();
    let headers = this.getClientHintHeaders();
    
    return await this.broker.callRestAction('detector.detect', {
      useragent, headers,
    });*/
  }
  
  /**
   * check traffic stage is unique for 24 hour or other setting
   * @returns {Promise<void>}
   */
  async trafficUniqueInfo(){
   /* let useragent = this.getUserAgent();
    let ip = this.getRemoteIp();
    let domain = '';
    return await this.broker.callRestAction('traffic.check-unique', {
      useragent, ip, domain
    });*/
  }
  
  /**
   * save traffic for buffer table.
   * with subsequent saving to productive storage
   * @param params
   * @returns {Promise<null|void>}
   */
  async #pushBuffer(params = {}) {
    /*let eventId = params.event ?? 0;
    if (!eventId) {
      return null;
    }
    
    // detect device only for EVENTS.HIT
    let data = {};
    let deviceInfo = {};
    let trafficUnique = {};
    if (eventId === EVENTS.HIT) {
      let result = await Promise.allSettled([
        this.trafficDeviceInfo(),
        this.trafficUniqueInfo()
      ])
      deviceInfo = result[0];
      trafficUnique = result[1];
    }
    
    
    return await this.broker.callRestAction(
      'stat-buffer.model.save',
      data
    );*/
  }
  
  /**
   * aggregate traffic by trafficId save to buffer table
   * for further analysis
   */
  async log() {
    /*this.setCorsHeadersOver();
    this.setClientHintsHeaders();*/
  }
  
}

module.exports = Traffic;