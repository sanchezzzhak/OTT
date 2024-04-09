const ExpressionBuilder = require("../expression-builder");
const Expression = require("../expression");

class ExistsConditionBuilder extends ExpressionBuilder
{
  /**
   * @param {ExistsCondition|Expression} expression
   * @param {{}} params
   * @returns {string|*}
   */
  build(expression, params) {
    let sql = this.queryBuilder.buildExpression(expression.query, params)
    return expression.operator + ' ' + sql;
  }
}

module.exports = ExistsConditionBuilder;