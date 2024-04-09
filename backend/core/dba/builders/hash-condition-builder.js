const ExpressionBuilder = require("../expression-builder");
const Expression = require("../expression");
const {InCondition} = require("../conditions");
const Query = require("../query");
const helper = require("../helper");

class HashConditionBuilder extends ExpressionBuilder
{
  /**
   * Build hash conditions
   * @param {HashCondition|{}} expression
   * @param params
   */
    build(expression, params) {

      const hash = expression.hash;
      const parts = [];

      for (let [column, value] of Object.entries(hash)) {
        if (helper.isTraversable(value) || helper.instanceOf(value, Query)) {
          let condition = new InCondition('IN', [column, value]);
          parts.push(this.queryBuilder.buildCondition(condition, params));
          continue;
        }
        if (helper.strncmp(column, '(') === false) {
          column = this.queryBuilder.db.quoteColumnName(column);
        }
        if (value === null) {
          parts.push(`${column} IS NULL`);
          continue;
        }
        if (helper.instanceOf(value, Expression)) {
          parts.push(`${column} = ${this.queryBuilder.buildExpression(value, params)}`);
          continue;
        }
        parts.push(`${column} = ${this.queryBuilder.bindParam(value, params)}`);
      }

      return parts.length === 1
           ? String(parts[0])
           : `(${parts.join(') AND (')})`;
    }
}

module.exports = HashConditionBuilder;