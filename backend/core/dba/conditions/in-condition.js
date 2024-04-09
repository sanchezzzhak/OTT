const Expression = require('../expression');
const helper = require('../helper');

/**
 *
 */
class InCondition extends Expression {

  #operator;
  #column;
  #values;

  constructor(operator, operands) {
    super();
    this.#operator = String(operator).toUpperCase();

    if (!helper.isset(operands[0]) && !helper.isset(operands[1])) {
      throw new Error(`Operator ${operator} requires two operands`);
    }
    this.#column = operands[0];
    this.#values = operands[1];

  }

  /**
   * @returns {*}
   */
  get operator() {
    return this.#operator;
  }

  /**
   * @returns {string}
   */
  get column() {
    return this.#column;
  }

  /**
   * @returns {Expression[]|string[]|number[]|Query}
   */
  get values() {
    return this.#values;
  }

}

module.exports = InCondition;