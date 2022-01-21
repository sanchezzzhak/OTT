const UWS = require('uWebSockets.js');
const { randomUUID } = require('crypto');
const fs = require('fs');
const fsPath = require('path');
const uwsSendFile = require('../utils/uws-send-file');

const UwsServer = ({config: config} = {}) => ({
  server: null,
  name: 'web-server',
  actions: {

  },
  routes: [],
  settings: {
    port: config.port ?? 3001,
    ssl: config.ssl ?? {},
    ip: config.ip ?? '127.0.0.1',
  },

  async created() {
    this.createServer()
    return Promise.resolve();
  },

  async started() {
    this.listenServer();
    return Promise.resolve();
  },

  stopped() {
  },

  methods: {
    listenServer() {
      // send static files js

      // adds middleware
      this.server.any('/*', async (res, req) => {
        req.setYield(true);
      });

      // init tracker traffic
      this.server.get('/t/:id', async (res, req) => {
        let id = req.getParameter(0);
        let data = JSON.stringify({
          trafficId: randomUUID(),
        });
        res.end(`window['_ott_${id}'] = ${data}`);
      });

      this.server.get('/*', (res, req) => {
        let root = fsPath.resolve(__dirname + '/../public');
        let path = req.getUrl();

        if(path === '/') {
          return uwsSendFile(req, res, {
            path: fsPath.join(root, 'index.html')
          });
        }
        return uwsSendFile(req, res, {
          path:   fsPath.join(root,path)
        });

      });

      // If it is possible to run on a normal port (80, 441)
      // without proxying in ngnix (do this)
      this.server.listen(this.settings.port, (listenSocket) => {
        if (listenSocket) {
          this.logger.info(`Server listening port:${this.settings.port}`);
        }
      })
    },


    createServer() {
      if (this.settings.ssl.enable) {
        this.server = UWS.SSLApp({
          key_file_name: this.settings.ssl.keyPath,
          cert_file_name: this.settings.ssl.certPath
        })
        return;
      }
      this.server = UWS.App({});
    }
  },
  getServerUws(){
    return this.server;
  }
});

module.exports = UwsServer;