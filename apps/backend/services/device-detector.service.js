const {Service} = require('moleculer');

const DeviceDetector = require('node-device-detector');
const ClientHints = require('node-device-detector/client-hints');
const DeviceHelper = require('node-device-detector/helper');

class DeviceDetectorService extends Service {
  /** @type DeviceDetector */
  detector;
  /** @type ClientHints */
  clientHints;

  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: 'device-detector',
      created: this.createdService,
      actions: {

        /**
         * @param ctx
         * @return {Promise<{[p: string]: *}>}
         */
        async detect(ctx) {
          const {useragent, headers, meta} = ctx.params;
          const hints = this.clientHints.parse(headers, meta);
          const result = this.detector.detect(useragent, hints);
          const bot = this.detector.parseBot(useragent, hints);

          return {
            ...result,
            bot,
            isFeaturePhone: DeviceHelper.isFeaturePhone(result),
            /* check device type smartphone  */
            isSmartphone: DeviceHelper.isSmartphone(result),
            /* check device type phablet  */
            isPhablet: DeviceHelper.isPhablet(result),
            /* check device type boxes, blu-ray players */
            isPortableMediaPlayer: DeviceHelper.isPortableMediaPlayer(result),
            /* check device type watches, headsets */
            isWearable: DeviceHelper.isWearable(result),
            /* check device type (feature phone, smartphone or phablet) */
            isMobile: DeviceHelper.isMobile(result),
            /* check device type is tablet  */
            isTablet: DeviceHelper.isTablet(result),
            /* check device type car (side panel in car)  */
            isCar: DeviceHelper.isCar(result),
            /* check device type only screen panel or laptop */
            isSmartDisplay: DeviceHelper.isSmartDisplay(result),
            /* portable terminal, portable projector */
            isPeripheral: DeviceHelper.isPeripheral(result),
            /* check device type is desktop */
            isDesktop: DeviceHelper.isDesktop(result) || result.device && result.device.type === '',
            /* check device type portable camera */
            isCamera: DeviceHelper.isCamera(result),
            /* check device type SmartTV/TV box */
            isTv: DeviceHelper.isTv(result),
            /* check device type smart speaker (Alisa, Alexa, HomePod etc) */
            isSmartSpeaker: DeviceHelper.isSmartSpeaker(result),
            /* check device type game console (xBox, PlayStation, Nintendo etc)  */
            isConsole: DeviceHelper.isConsole(result),
            /* check is bot */
            isBot: Boolean(bot && bot.name),
          };
        }

      },
    });
  }

  async createdService() {
    this.detector = new DeviceDetector({
      deviceIndexes: true,
      clientIndexes: true,
      deviceTrusted: true,
      deviceAliasCode: true,
    });
    this.clientHints = new ClientHints();
  }

}

module.exports = DeviceDetectorService;
