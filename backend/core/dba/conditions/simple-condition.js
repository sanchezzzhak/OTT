const Expression = require('../expression');

class SimpleCondition extends Expression {
  #operator;
  #column
  #value;

  constructor(operator, operands) {
    console.log({operator, operands})
    if (!operands || operands.length !== 2) {
      throw new Error("Operator 'operator' requires two operands.");
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

module.exports = SimpleCondition;