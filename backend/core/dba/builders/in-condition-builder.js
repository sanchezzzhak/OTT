const ExpressionBuilder = require('../expression-builder');
const Expression = require('../expression');
const InCondition = require('../conditions/in-condition');
const Query = require('../query');
const helper = require('../helper');

const VALUES_SEPARATOR = ', ';

class InConditionBuilder extends ExpressionBuilder {

  #quoteColumnName(column) {
    if (helper.instanceOf(column, Expression)) {
      column = column.expression;
    }
    if (helper.strncmp(column, '(') === false) {
      column = this.queryBuilder.db.quoteColumnName(column);
    }
    return column;
  }

  /**
   * Method builds the raw SQL from the $expression that will not be additionally
   * escaped or quoted.
   *
   * @param {InCondition|Expression} expression
   * @param params
   */
  build(expression, params) {

    let operator = expression.operator.toUpperCase();
    let column = expression.column;
    let values = expression.values;

    if (!column) {
      return operator === 'IN' ? '0=1' : '';
    }

    if (helper.instanceOf(values, Query)) {
      return this.buildSubQueryInCondition(operator, column, values, params);
    }

    if (!Array.isArray(values) && helper.isTraversable(values)) {
      values = Object.values(values);
    }

    if (helper.isTraversable(column)) {
      if (helper.count(column) > 1) {
        return this.buildCompositeInCondition(operator, column, values, params);
      }
      if (typeof column === 'object') {
        let objectInfo = helper.extractObject(column);
        column = objectInfo.value;
      } else {
        column = column[0];
      }
    }

    let rawValues = [];
    if (Array.isArray(values)) {
      rawValues = values;
    } else if (helper.isTraversable(values)) {
      rawValues = this.getRawValuesFromTraversableObject(values);
    }
    let nullCondition = null;
    let nullConditionOperator = null;
    if (void 0 !== rawValues && rawValues.includes(null)) {
      nullCondition = this.getNullCondition(operator, column);
      nullConditionOperator = operator === 'IN' ? 'OR' : 'AND';
    }

    let sqlValues = this.buildValues(expression, values, params);

    if (helper.empty(sqlValues)) {
      if (nullCondition === null) {
        return operator === 'IN' ? '0=1' : '';
      }
      return nullCondition;
    }

    if (helper.strncmp(column, '(') === false) {
      column = this.queryBuilder.db.quoteColumnName(column);
    }
    let sql = '';
    if (helper.count(sqlValues) > 1) {
      sql = `${column} ${operator} (${sqlValues.join(VALUES_SEPARATOR)})`;
    } else {
      operator = operator === 'IN' ? '=' : '<>';
      sql = column + operator + sqlValues;
    }

    return nullCondition !== null && nullConditionOperator !== null
        ? `${sql} ${nullConditionOperator}, ${nullCondition}`
        : sql;
  }

  /**
   *
   * @param operator
   * @param column
   * @returns {string}
   */
  getNullCondition(operator, column) {
    column = this.queryBuilder.db.quoteColumnName(column);
    if (operator === 'IN') {
      return `${column} IS NULL`;
    }
    return `${column} IS NOT NULL`;
  }

  /**
   *
   * @param condition
   * @param values
   * @param params
   * @returns {[]}
   */
  buildValues(condition, values, params) {
    let sqlValues = [];
    let column = condition.column;

    if (Array.isArray(column)) {
      column = column[0];
    }
    if (helper.instanceOf(column, Expression)) {
      column = column.expression;
    }
    if (typeof column === 'object') {
      let objectInfo = helper.extractObject(column);
      column = objectInfo.value;
    }

    for (let [key, value] of Object.entries(values)) {
      if (typeof value === 'object') {
        value = helper.isset(value[column]) ? value[column] : null;
      }
      if (value === null) {
        continue;
      }
      if (helper.instanceOf(value, Expression)) {
        sqlValues.push(this.queryBuilder.buildExpression(value, params));
        continue;
      }
      sqlValues.push(this.queryBuilder.bindParam(value, params));
    }
    return sqlValues;
  }

  /**
   * Builds SQL for IN condition.
   * @param {string} operator
   * @param {array|string|string[]} column
   * @param {Query} values
   * @param {{}} params
   * @returns {string}
   */
  buildSubQueryInCondition(operator, column, values, params) {
    let sql = this.queryBuilder.buildExpression(values, params);

    if (Array.isArray(column)) {
      for (const [key, value] of Object.entries(column)) {
        column[key] = this.#quoteColumnName(value);
        return `(${column.join(', ')}) ${operator} ${sql}`;
      }
    }
    column = this.#quoteColumnName(column);
    return `${column} ${operator} ${sql}`;
  }

  buildCompositeInCondition(operator, column, values, params) {
    let vss = [];
    for (let [key, value] of Object.entries(values)) {
      let vs = [];
      for (let [keyColumn, column] of Object.entries(values)) {
        if (helper.instanceOf(column, Expression)) {
          column = column.expression;
        }
        if (helper.isset(value[column])) {
          vs.push(this.queryBuilder.bindParam(value[column], params));
          continue;
        }
        vs.push('NULL');
      }
      vss.push(`(${vs.join(VALUES_SEPARATOR)})`);
    }

    if (helper.empty(vss)) {
      return operator === 'IN' ? '0=1' : '';
    }
    let columns = [];
    for (let [key, column] of Object.entries(values)) {
      if (helper.instanceOf(column, Expression)) {
        column = column.expression;
      }
      columns.push(helper.strncmp(column, '(') === false
          ? this.queryBuilder.db.quoteColumnName(column)
          : column,
      );
    }
    return `(${columns.join(VALUES_SEPARATOR)}) ${operator} (${vss.join(
        VALUES_SEPARATOR)})`;
  }

  getRawValuesFromTraversableObject(values) {
    let rawValues = [];
    for (let [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        let values = value.values();
        rawValues = rawValues.concat(values);
      } else {
        rawValues.push(value);
      }
    }
    return rawValues;
  }
}

module.exports = InConditionBuilder;