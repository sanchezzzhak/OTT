import { once } from "@ott/untils/events"
import { insertScript } from "@ott/untils/insert-script.js"

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

    init() {
      if (this.ready) {
        return;
      }
      let target = q(['script[data-ott-id]']);
      if (target) {
        this.id = target.dataset.ottId;
        this.endpoint = target.dataset.endpoint;

        if (!this.id || !this.endpoint) {
          console.error('error init', new Error(''))
          return;
        }

        insertScript(target, {
          src: this.baseUrl() + '?a=init',
          async: true,
        }).then(s => {
          target.removeChild(s);

          if (win._ott_data[this.id] &&  win._ott_data[this.id].trafficId) {
            this.data = recopy(win._ott_data[this.id]);
            delete win._ott_data;
            this.ready = true;
          }

        }).catch(e => {
          console.error('error init', e);
        })
      }
    }

    baseUrl() {
      return location.protocol + '//' + this.endpoint + '/t/' + this.id;
    }

    send(args) {
      let http = new XMLHttpRequest();
      http.open("POST", this.baseUrl() + '?a=event');
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.send(JSON.stringify(args));
    }

    process() {
      if (!this.ready) {
        return;
      }
      recopy(win._opaq).forEach((arg) => {
        this.send(arg);
      });
      win._qpaq = {
        push: (args) => {
          this.send(args)
        }
      }
    }
  }

  if (win._opaq !== void 0) {
    win._opaq = []
  }
  win.ott = new TrackApp();
  win.ott.init();

  if (dom.readyState === 'complete'){
    win.ott.process();
  } else {
    once(dom, 'DOMContentLoaded', () => {
      win.ott.process();
    })
  }
