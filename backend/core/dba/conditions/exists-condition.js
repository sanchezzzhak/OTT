const Expression = require('../expression');
const helper = require('../helper');
const Query = require("../query");

/**
 *
 */
class ExistsCondition extends Expression {

  #operator;
  #query;

  constructor(operator, operands) {
    super();
    this.#operator = String(operator).toUpperCase();

    if (!helper.isset(operands[0]) || !operands[0] instanceof Query) {
      throw new Error('Subquery for EXISTS operator must be a Query object.');
    }
    this.#query = operands[0];
  }

  /**
   * Returns the  operator to use (e.g. `EXISTS`, `NOT EXISTS`.
   * @returns {*}
   */
  get operator() {
    return this.#operator;
  }

  /**
   * object representing the sub-query.
   * @returns {Query}
   */
  get query() {
    return this.#query;
  }
}

module.exports = ExistsCondition;