
const Expression = require('../expression');

/**
 * todo added later
 */
class BetweenCondition extends Expression
{
  #operator;
  #column;
  #intervalStart;
  #intervalEnd;

  constructor(operator, operands) {
    super();
    this.#operator = operator;
    this.#column = operands[0];
    this.#intervalStart = operands[1];
    this.#intervalEnd = operands[2];
  }

  get intervalStart() {
    return this.#intervalStart;
  }

  get intervalEnd() {
    return this.#intervalEnd;
  }

  /**
   * Get operator to use (e.g. `BETWEEN` or `NOT BETWEEN`)
   *
   * @returns {string}
   */
  get operator(){
    return this.#operator;
  }

  /**
   * the column name to the left of [[operator]]
   *
   * @returns {*}
   */
  get column(){
    return this.#column;
  }
}

module.exports = BetweenCondition;