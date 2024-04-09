const ExpressionBuilder = require("../expression-builder");
const Expression = require("../expression");
const helper = require("../helper");

class BetweenConditionBuilder extends ExpressionBuilder
{
  /**
   * Method builds the raw SQL from the $expression that will not be additionally
   * escaped or quoted.
   * @param {BetweenCondition} expression - the expression to be built.
   * @param {{}} params - the binding parameters.
   */
  build(expression, params) {
    const operator = expression.operator;
    let column = expression.column;
    if (helper.strncmp(column, '(') === false) {
      column = this.queryBuilder.db.quoteColumnName(column);
    }
    const startInterval = this.makePlaceholder(expression.intervalStart, params);
    const startEnd = this.makePlaceholder(expression.intervalEnd, params);

    return [column, operator,  startInterval, 'AND', startEnd].join(' ');
  }

  /**
   * Attaches $value to $params array and returns placeholder.
   * @param value - any
   * @param params - passed by reference
   * @returns {string}
   */
  makePlaceholder(value, params) {
    if (helper.instanceOf(value, Expression)) {
      return this.queryBuilder.buildExpression(value, params);
    }
    return this.queryBuilder.bindParam(value, params);
  }

}

module.exports = BetweenConditionBuilder;