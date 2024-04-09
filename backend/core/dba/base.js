const EventEmitter = require('eventemitter2');

class Base extends EventEmitter {

  constructor(config) {
    super({});
    this.setOwnProperties(config)
  }

  /**
   * DI set own properties
   * @param {{}} config
   */
  setOwnProperties(config = {}) {
    if (!config) {
      return;
    }

    for (let [key, value] of Object.entries(config)) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    }
  }
}

module.exports = Base;