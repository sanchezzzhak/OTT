const fsPath = require('path');

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
  publicDir: fsPath.resolve(__dirname + '/../public')
};

module.exports = appConfig;