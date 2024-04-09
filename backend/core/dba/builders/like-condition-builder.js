const ExpressionBuilder = require('../expression-builder');
const Expression = require('../expression');
const helper = require('../helper');

class LikeConditionBuilder extends ExpressionBuilder {
  /**
   * Method builds the raw SQL from the $expression that will not be additionally
   * escaped or quoted.
   *
   * @param {LikeCondition|Expression} expression
   * @param {{}} params
   */
  build(expression, params) {
    let operator = expression.operator;
    let column = expression.column;
    let values = expression.value;

    let parseInfo = this.parseOperator(operator);


    if (!Array.isArray(values)) {
      values = [values];
    }

    if (helper.empty(values)) {
      return parseInfo.not ? '' : '0=1';
    }
    if (helper.instanceOf(column, Expression)) {
      column = this.queryBuilder.buildExpression(column, params);
    } else if (helper.strncmp(column, '(') === false) {
      column = this.queryBuilder.db.quoteColumnName(column);
    }
    let parts = [];
    for (let [key, value] of Object.entries(values)) {
      let val;
      if (helper.instanceOf(value, Expression)) {
        val = value.expression;
      } else {
        val = this.queryBuilder.bindParam(value, params);
      }
      parts.push(`${column} ${parseInfo.operator} ${val}`);
    }

    return parts.join(parseInfo.logic);
  }

  /**
   * @param  {String} operator
   */
  parseOperator(operator) {
    let regex = /^(AND |OR |)(((NOT |))I?LIKE)/;
    let match = regex.exec(operator);
    if (!match) {
      throw new Error(`Invalid operator '${operator}'.`);
    }
    let logic = ' ' + (!helper.empty(match[1]) ? match[1] : 'AND ');
    let not = !helper.empty(match[3]);
    operator = match[2];
    return {logic, not, operator};
  }

}

module.exports = LikeConditionBuilder;