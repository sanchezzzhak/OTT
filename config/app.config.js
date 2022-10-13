const fsPath = require('path');
const requireLocalConfig = require('../backend/utils/require-local-config');

const appConfig = {
  port: Number(process.env.SERVER_PORT ?? 3001),
  ssl: {
    enable: Boolean(process.env.SERVER_SSL ?? false),
    keyPath: String(process.env.SERVER_SSL_KEY ?? ''),
    certPath: String(process.env.SERVER_SSL_CERT ?? ''),
  },
  ws: {
    enable: false,
  },
  publicDir: fsPath.resolve(__dirname + '/../public'),
  jwt: '',
  secretRegisterKey: '__test__',
  telegram: '',
};

module.exports = {
  ...appConfig, ...requireLocalConfig(__dirname + '/local/app.config.js'),
};
