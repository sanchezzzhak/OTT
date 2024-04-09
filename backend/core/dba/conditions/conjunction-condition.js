const Expression = require('../expression');

/**
 *
 */
class ConjunctionCondition extends Expression {
  #operator;
  #expressions;
  constructor(operator, operands) {
    super();
    this.#operator = String(operator).toUpperCase();
    this.#expressions = operands;
  }

  /**
   * Returns the operator that is represented by this condition class, e.g. `AND`, `OR`.
   * @returns {*}
   */
  get operator() {
    return this.#operator;
  }

  get expressions() {
    return this.#expressions;
  }
}

module.exports = ConjunctionCondition;