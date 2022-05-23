const {Service} = require('moleculer');

const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');
const ClientHints = require('node-device-detector/client-hints');

class DetectorService extends Service {
  #detector;
  #clientHints;
  
  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'detector',
      started: this.start,
      methods: {
        detector: {
          /**
           *
           * @param ctx
           * @returns {Promise<{common: (DetectResult|{}), bot: (ResultBot|{})}>}
           */
          async handler(ctx) {
            let {useragent, headers} = ctx.params;
            return this.detectTraffic(useragent, headers);
          },
        },
      },
    });
  }
  
  start() {
    this.#detector = new DeviceDetector({
      deviceIndexes: true,
      deviceAliasCode: true,
    });
    this.#clientHints = new ClientHints;
  }
  
  /**
   *
   * @param userAgent
   * @param headers
   * @returns {{common: (DetectResult|{}), bot: (ResultBot|{})}}
   */
  detectTraffic(userAgent, headers = {}) {
    let bot = this.#detector.parseBot(userAgent);
    let common = this.#detector.detect(userAgent,
      this.#clientHints.parse(headers));
    
    return {
      common, bot,
    };
  }
  
}

module.exports = DetectorService;
