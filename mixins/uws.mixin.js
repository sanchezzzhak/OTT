const UWS = require('uWebSockets.js');
const {randomUUID} = require('crypto');
const fs = require('fs');
const fsPath = require('path');
const uwsSendFile = require('../utils/uws-send-file');
const {pathToRegexp} = require('path-to-regexp');

const UwsServer = ({config: config} = {}) => ({
  server: null,
  name: 'web-server',
  actions: {},

  settings: {
    port: config.port ?? 3001,
    ssl: config.ssl ?? {},
    ip: config.ip ?? '127.0.0.1',
    routes: [],
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

    addRoute(opts, toLastPos = true) {

      const method = opts.method !== void 0 ? opts.method : 'any';
      const route = this.createRoute(opts);

      if (this.routes[method] === void 0) {
        this.routes[method] = [];
      }

      const idx = this.routes[method].findIndex(r => r.opts.path === route.opts.path);

      if (idx !== -1) {
        this.routes[method][idx] = route;
      } else if (toLastPos) {
        this.routes[method].push(route);
      } else {
        this.routes[method].unshift(route);
      }
      return route;
    },

    createRoute(opts) {
      let route = {
        opts,
        keys: [],
        params: {},
        middlewares: []
      };

      route.regexp = pathToRegexp(opts.path, route.keys, {});
      route.regexp.fast_star = opts.path === '*';
      route.regexp.fast_slash = opts.path === '/';

      // `onBeforeCall` handler
      if (opts.onBeforeCall) {
        route.onBeforeCall = this.Promise.method(opts.onBeforeCall);
      }
      // `onAfterCall` handler
      if (opts.onAfterCall) {
        route.onAfterCall = this.Promise.method(opts.onAfterCall);
      }

      // `onError` handler
      if (opts.onError){
        route.onError = opts.onError;
      }
      return route;
    },

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
        res.end(`window['_ott_${id}'] = ${data}`);
      });

      this.server.get('/*', (res, req) => {
        let root = fsPath.resolve(__dirname + '/../public');
        let path = req.getUrl();

        if (path === '/') {
          return uwsSendFile(req, res, {
            path: fsPath.join(root, 'index.html')
          });
        }
        return uwsSendFile(req, res, {
          path: fsPath.join(root, path)
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
  getServerUws() {
    return this.server;
  }
});

module.exports.UwsServer = UwsServer;
module.exports.METHOD_GET = 'get';
module.exports.METHOD_ANY = 'any';
module.exports.METHOD_POST = 'post';