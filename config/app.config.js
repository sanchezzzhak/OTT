const fsPath = require('path');
const requireLocalConfig = require('../backend/utils/require-local-config')

const appConfig = {
  port: 3001,
  ssl: {
    enable: false,
    keyPath: "",
    certPath: ""
  },
  ws: {
    enable: false
  },
  publicDir: fsPath.resolve(__dirname + '/../public'),
  jwt: "",
  telegram: '',
};

module.exports = {...appConfig, ...requireLocalConfig(__dirname + '/local/app.config.js')};
