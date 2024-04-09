const ExpressionBuilder = require("../expression-builder");
const Expression = require("../expression");
const helper = require("../helper");


class SimpleConditionBuilder extends ExpressionBuilder {
  /**
   * Method builds the raw SQL from the $expression that will not be additionally
   * escaped or quoted.
   * @param {SimpleCondition|Expression} expression
   * @param {{}} params
   * @returns {string}
   */
  build(expression, params) {
    let operator = expression.operator;
    let column = expression.column;
    let value = expression.value;

    if (helper.instanceOf(column, Expression)) {
      column = this.queryBuilder.buildExpression(column, params);
    } else if (typeof column === 'string' && column.indexOf('(') === -1) {
      column = this.queryBuilder.db.quoteColumnName(column);
    }

    if (value === null) {
      return `${column} ${operator} NULL`;
    }

    if (helper.instanceOf(value, Expression)) {
      return `${column} ${operator} ${this.queryBuilder.buildExpression(value, params)}`
    }

    let placeholderName = this.queryBuilder.bindParam(value, params);
    return `${column} ${operator} ${placeholderName}`;
  }
}

module.exports = SimpleConditionBuilder;