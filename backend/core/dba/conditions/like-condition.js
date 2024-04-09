const Expression = require('../expression');
const helper = require('../helper');

class LikeCondition extends Expression {
  #operator;
  #column;
  #value;

  constructor(operator, operands) {
    if (!helper.isset(operands[0]) || !helper.isset(operands[1])) {
      throw new Error(`Operator '${operator}' requires two operands.`);
    }
    super();
    this.#column = operands[0];
    this.#operator = operator;
    this.#value = operands[1];
  }

  get operator() {
    return this.#operator;
  }

  get column() {
    return this.#column;
  }

  get value() {
    return this.#value;
  }
}

module.exports = LikeCondition;