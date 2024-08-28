import { once } from "@ott/untils/events"
import { buildUrl } from "@ott/untils/url"
import { insertScript } from "@ott/untils/insert-script.js"
import Check4 from "./fingerprint.js"
import DeviceCollector from "./device-collector.js"

/**
 * @typedef TrackAppOptions
 * @property {string} id       - counter id
 * @property {string} endpoint - localhost:3001
 */
  const win = window;
  const dom = document;
  const target = dom.currentScript;
  const q = dom.querySelector;
  const qq = dom.querySelectorAll;

  const arrayChunk = (array, chunk = 10) => {
    let i, j, newArr;
    for (i = 0, j = array.length; i < j; i += chunk) {
      newArr = array.slice(i, i + chunk);
    }
    return newArr;
  };

  const recopy = (obj) => JSON.parse(JSON.stringify(obj));

  class TrackApp {
    id = '';
    data = {};
    ready = false;
    endpoint = '';
    fb = '';
    meta = {};

    init() {
      if (this.ready) {
        return;
      }
      let target = q(['script[data-ott-id]']);
      if (target) {
        this.id = target.dataset.ottId;
        this.endpoint = target.dataset.endpoint;

        if (!this.id || !this.endpoint) {
          console.error('error init data.id or data.endpoint not found');
          return;
        }

        try {
          (async () => {
            this.fb = await this.#initFb();
            this.meta = await this.#initHints();
            await this.#init()
          })();
        } catch (e) {}
      }

      this.#process();
    }

    /**
     * Init meta data
     * @return {Promise<{Object}>}
     */
    #initHints() {
      return new Promise((resolve)=> {
        let deviceCollector = new DeviceCollector();
        deviceCollector.info().then(meta => {
          resolve(meta);
        })
      })
    }

    /**
     * Init FingerPrint
     * @return {Promise<string>}
     */
    #initFb() {
      return new Promise((resolve) => {
        Check4.load()
          .then(fs => fs.get())
          .then(r => {
              resolve(r.visitorId)
          })
      })
    }

    /**
     * Init data and save first hit
     * @return {Promise<void>}
     */
    #init() {
      return new Promise((resolve) => {
        insertScript(target, {
          src: buildUrl(this.#baseUrl() + '?a=init', {
            fb: this.fb,
            meta: this.meta,
          }),
          async: true,
        }).then(s => {
          if (s === null) {
            console.error('error script not load');
            return resolve();
          }
          target.removeChild(s);
          let key = '_ott_' + this.id;
          if (win[key] &&  win[key].trafficId) {
            this.data = recopy(win[key]);
            delete win[key];
            this.ready = true;
          }
          resolve();
        }).catch(e => {
          console.error('error init catch', e);
          resolve();
        })
      })
    }

    /**
     * Get tracker base url
     * @return {string}
     */
    #baseUrl() {
      let isProtocol = /https?:\/\//i.test(this.endpoint);
      let baseUrl = this.endpoint + '/t/' + this.id;
      return !isProtocol ? location.protocol + '//' + baseUrl : baseUrl;
    }

    /**
     * Send data for ajax
     * @param args
     */
    #send(args) {
      let http = new XMLHttpRequest();
      http.open("POST", this.#baseUrl() + '?a=event');
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.send(JSON.stringify(args));
    }

    /**
     * Send all events and replace _qpaq variable to objects
     */
    #process() {
      if (!this.ready) {
        return;
      }
      recopy(win._opaq).forEach((arg) => {
        this.#send(arg);
      });
      win._qpaq = {
        push: (args) => {
          this.#send(args)
        }
      }
    }
  }

  if (win._opaq !== void 0) {
    win._opaq = []
  }
  win.ott = new TrackApp();


  if (dom.readyState === 'complete'){
    win.ott.init();
  } else {
    once(dom, 'DOMContentLoaded', () => {
      win.ott.init();
    })
  }
