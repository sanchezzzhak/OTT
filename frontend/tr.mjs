/**
 * @typedef TrackAppOptions
 * @property {string} id       - counter id
 * @property {string} endpoint - localhost:3001
 */

!function(win, dom) {
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
    static async instance(config) {
      if (!target instanceof HTMLElement) {
        console.warn('Error: target script not found');
      }
      let id = config.id;
      if (ott[id]) {
        return ott[id];
      }
  
      let endpoint = config.endpoint;
      if (!endpoint) {
        endpoint = location.host;
      }
  
      let tr = new TrackApp(config);
      
      try {
        /** @var HtmlElement */
        let e = target || dom.body;
        let s = await loadScript(e, '//' + endpoint + '/t/' + id);
        let options = win["_ott_" + id];
        e.removeChild(s);
        
        if (!options) {
          tr.trafficId = options.trafficId;
        }
      } catch (e) {

      }
      
      return ott[id] = tr;
    }
    
    /**
     * @param {TrackAppOptions} config
     */
    constructor(config) {
      this.config = config;
    }
    
    
    _send(args) {
      console.log('_send', args)
    }
    
    push(name, options) {
      this._queueProcess();
    }
    
    _queueProcess() {
    }
  }
  
  win._ott = TrackApp;
}(window, document);

console.log('install tr.mjs')