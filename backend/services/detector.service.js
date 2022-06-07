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
      started: this.startedService,
      methods: {
        /**
         *
         * @param ctx
         * @returns {Promise<{common: (DetectResult|{}), bot: (ResultBot|{})}>}
         */
        async detect(ctx) {
          let {useragent, headers} = ctx.params;
          let bot = this.#detector.parseBot(useragent);
          let common = this.#detector.detect(useragent,
            this.#clientHints.parse(headers));

          return {common, bot};
        },

      },
    });
  }

  startedService() {
    this.#detector = new DeviceDetector({
      deviceIndexes: true,
      deviceAliasCode: true,
    });
    this.#clientHints = new ClientHints;
  }

}

module.exports = DetectorService;
