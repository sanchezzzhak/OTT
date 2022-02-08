// const pathRegexp = require('path-to-regexp');

const {resolve} = require('path');
const {ServiceBroker} = require('moleculer');
// configs init
const moleculerConfig = require('../config/moleculer.config');
// microservices init
const broker = new ServiceBroker(moleculerConfig);

broker.loadServices(
  resolve(__dirname, 'services'), '*.service.js',
);
broker.loadServices(
    resolve(__dirname, 'services/models'), '*.service.js',
);

broker.start().then(() => {

});
