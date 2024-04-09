const ExpressionBuilder = require("../expression-builder");
const Expression = require("../expression");


class NotConditionBuilder extends ExpressionBuilder {
  /**
   * Method builds the raw SQL from the $expression that will not be additionally
   * escaped or quoted.
   *
   * @param {NotCondition|Expression} expression
   * @param {{}} params
   * @returns {string|*}
   */
  build(expression, params) {

    let operand = expression.condition;
    if (operand === '') {
      return '';
    }

    let sql = this.queryBuilder.buildExpression(operand, params);
    return `${this.getNegationOperator()} (${sql})`;
  }

  getNegationOperator() {
    return 'NOT';
  }
}

module.exports = NotConditionBuilder;