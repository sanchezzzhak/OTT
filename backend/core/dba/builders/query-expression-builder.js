const ExpressionBuilder = require("../expression-builder");
const Expression = require("../expression");

class QueryExpressionBuilder extends ExpressionBuilder {

  /**
   * Method builds the raw SQL from the $expression that will not be additionally
   * escaped or quoted.
   *
   * @param {Expression|Query} expression - the expression to be built.
   * @param {{}} params - he binding parameters.
   * @returns {string}
   */
  build(expression, params) {
    let {sql} = this.queryBuilder.build(expression, params);
    return `(${sql})`;
  }

}

module.exports = QueryExpressionBuilder;