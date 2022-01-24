const UWS = require('uWebSockets.js');

const fs = require('fs');
const fsPath = require('path');
const uwsSendFile = require('../utils/uws-send-file');
const {pathToRegexp} = require('path-to-regexp');

/**
 * Decode param value.
 * @param val {String}
 * @return {String}
 * @private
 */
function decodeRouterParam(val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }
  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = 'Failed to decode param \'' + val + '\'';
      err.status = 400;
    }
    throw err;
  }
}

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
    this.createServer();
    return Promise.resolve();
  },
  
  async started() {
    this.listenServer();
    return Promise.resolve();
  },
  
  stopped() {
  },
  
  methods: {
    
    getServerUws() {
      return this.server;
    },
    
    matchRouter(res, req) {
      let pathUrl = req.getUrl();
      let method = req.getMethod();
      
      for (let i = 0, l = this.settings.routes[method].length; i < l; i++) {
        let route = this.settings.routes[method][i];
        let match = route.regexp.exec(pathUrl);
        if (match) {
          // iterate matches
          let keys = route.keys;
          let params = route.params;
          for (let m = 1; m < match.length; m++) {
            let key = keys[m - 1];
            let prop = key.name;
            let val = decodeRouterParam(match[m]);
            if (val !== void 0) {
              params[prop] = val;
            }
          }
          return route;
        }
      }
      return null;
    },
    
    addRoute(opts, toLastPos = true) {
      const method = opts.method !== void 0 ? opts.method : 'any';
      const route = this.createRoute(opts);
      
      if (this.settings.routes[method] === void 0) {
        this.settings.routes[method] = [];
      }
      
      const idx = this.settings.routes[method].findIndex(
        r => r.opts.path === route.opts.path);
      
      if (idx !== -1) {
        this.settings.routes[method][idx] = route;
      } else if (toLastPos) {
        this.settings.routes[method].push(route);
      } else {
        this.settings.routes[method].unshift(route);
      }
      return route;
    },
    
    runRoute(router, res, req) {
      if (router !== null) {
        try {
          const {controller, action} = router.opts;
          // try {
          let controllerClass = require(
            `./../controllers/${controller}-controller`);
          
          return (new controllerClass(
            {broker: this.broker, req, res}))[action]();
        } catch (e) {
          this.logger.error(e);
        } finally {
          return 0;
        }
      }
      
      return -1;
    },
    
    createRoute(opts) {
      let route = {
        opts,
        keys: [],
        params: {},
        middlewares: [],
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
      if (opts.onError) {
        route.onError = opts.onError;
      }
      return route;
    },
    
    listenServer() {
      
      // // adds middleware hook
      // this.server.any('/*', async (res, req) => {
      //   req.setYield(true);
      // });
      
      this.server.any('/*', (res, req) => {
        let router = this.matchRouter(res, req);
        if (router !== null) {
          if (this.runRoute(router, res, req) !== -1) {
            return;
          }
        }
        
        // static files
        let root = fsPath.resolve(__dirname + '/../public');
        let path = req.getUrl();
        
        if (path === '/') {
          return uwsSendFile(req, res, {
            path: fsPath.join(root, 'index.html'),
          });
        }
        return uwsSendFile(req, res, {
          path: fsPath.join(root, path),
        });
      });
      
      // If it is possible to run on a normal port (80, 441)
      // without proxying in ngnix (do this)
      this.server.listen(this.settings.port, (listenSocket) => {
        if (listenSocket) {
          this.logger.info(`Server listening port:${this.settings.port}`);
        }
      });
    },
    
    createServer() {
      if (this.settings.ssl.enable) {
        this.server = UWS.SSLApp({
          key_file_name: this.settings.ssl.keyPath,
          cert_file_name: this.settings.ssl.certPath,
        });
        return;
      }
      this.server = UWS.App({});
    },
  },
});

module.exports.UwsServer = UwsServer;
module.exports.METHOD_GET = 'get';
module.exports.METHOD_ANY = 'any';
module.exports.METHOD_POST = 'post';