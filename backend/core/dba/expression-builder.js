const Base = require('./base');

class ExpressionBuilder extends Base {

  /** @type {QueryBuilder} */
  queryBuilder;
  
  constructor(queryBuilder) {
    super();
    this.queryBuilder = queryBuilder;
  }
  
  /**
   * @param {Expression} expression - the expression to be built
   * @param {object} params
   * @return {string}
   */
  build(expression, params) {
    params = {...params, ...expression.params};
    return expression.toString();
  }
  
}

module.exports = ExpressionBuilder;