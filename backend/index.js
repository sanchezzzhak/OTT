

const { ServiceBroker } = require('moleculer');
const { resolve } = require('path');
// configs init
const moleculerConfig = require('../config/moleculer.config');
// microservices init
const broker = new ServiceBroker(moleculerConfig);

broker.loadServices(
  resolve(__dirname, 'services'), '*.service.js'
);

broker
  .start()
  .then(() => {
    broker.logger.info('✔ Broker start completed');
    broker.logger.info('✔ OTT server started');
    broker.logger.info('✔ Good luck');
  }).catch(e => {
    broker.logger.error(e);
  });