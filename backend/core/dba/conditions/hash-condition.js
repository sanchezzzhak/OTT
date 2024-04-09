const Expression = require('../expression');

class HashCondition extends Expression {

  #hash;

  /**
   * @param {{}} hash
   */
  constructor(hash) {
    super();
    this.#hash = hash;
  }

  get hash() {
    return this.#hash;
  }

}

module.exports = HashCondition;