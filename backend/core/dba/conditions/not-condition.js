const Expression = require('../expression');

/**
 *
 */
class NotCondition extends Expression {

  #condition;

  constructor(operator, operands) {
    super();
    if (operands.length !== 1) {
      throw new Error(`Operator '${operator}' requires exactly one operand.`);
    }

    this.#condition = operands.shift();
  }

  /**
   * @returns {*}
   */
  get condition() {
    return this.#condition;
  }

}

module.exports = NotCondition;