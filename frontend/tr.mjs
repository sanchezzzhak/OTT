/**
 * @typedef TrackAppOptions
 * @property {string} id       - counter id
 * @property {string} endpoint - localhost:3001
 */

!function (win, dom) {
  'use strict';

  const target = document.currentScript;

  const arrayChunk = (array, chunk = 10) => {
    let i, j, newArr;
    for (i = 0, j = array.length; i < j; i += chunk) {
      newArr = array.slice(i, i + chunk);
    }
    return newArr;
  };

  const loadScript = (target, src) => {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;
      script.addEventListener('load', (e) => resolve(script), false);
      script.addEventListener('error', (err) => reject(err), false);
      target.parentNode.insertBefore(script, target.nextSibling);
    });
  };

  const ott = {};
  const q = dom.querySelector;
  const qq = dom.querySelectorAll;

  class TrackApp {
    __q = [];
    init = false;
    target;
    trafficId;

    /**
     *
     * @param {TrackAppOptions} config
     * @returns {TrackApp|*}
     */
    static instance(config) {
      if (!target instanceof HTMLElement) {
        console.warn('Error: target script not found');
      }
      let endpoint = config.endpoint;
      let id = config.id;
      if (ott[id]) {
        return ott[id];
      }

      if (!endpoint) {
        endpoint = location.host;
      }
      let tr = new TrackApp(config);
      /** @var HtmlElement */
      let e = target || dom.body;
      loadScript(e, '//' + endpoint + '/t/' + id).then((s) => {
        e.removeChild(s);
        if (!options) {
          tr.trafficId = options.trafficId;
        }
        tr.init = true;

      }).catch(e => {
        console.error('error init', e);
      });
      return ott[id] = tr;
    }

    /**
     * @param {TrackAppOptions} config
     */
    constructor(config) {
      this.config = config;
    }

    send(args) {
      console.log('send', args)
    }

    push(name, options) {
      this.queueProcess();
    }

    queueProcess() {
    }
  }
  win._ott = TrackApp;
}(window, document);
