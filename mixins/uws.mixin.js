const UWS = require('uWebSockets.js');
const { randomUUID } = require('crypto');

const UwsServer = ({config: config} = {}) => ({
  server: null,
  name: 'web-server',
  actions: {},
  routes: [],
  settings: {
    port: config.port ?? 3001,
    ssl: config.ssl ?? {},
    ip: config.ip ?? '127.0.0.1',
  },

  created() {
    this.createServer()
  },

  started() {
    this.listenServer();
  },

  stopped() {
  },

  methods: {
    listenServer() {
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
        res.end(`window[_ott_${id}] = ${data}`);
      });
      // send static files
      this.server.get('/public/*', async (res, req) => {
      
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
  }
});

module.exports = UwsServer;