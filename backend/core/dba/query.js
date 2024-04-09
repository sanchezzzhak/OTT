const Base = require('./base');
const helper = require('./helper');
const Expression = require('./expression');

const
    RULE_SELECT = 'select',
    RULE_SELECT_OPTION = 'selectOption',
    RULE_WHERE = 'where',
    RULE_FROM = 'from',
    RULE_JOIN = 'join',
    RULE_UNION = 'union',
    RULE_HAVING = 'having',
    RULE_GROUP_BY = 'groupBy',
    RULE_ORDER_BY = 'orderBy',
    RULE_LIMIT = 'limit',
    RULE_PARAMS = 'params',
    RULE_OFFSET = 'offset',
    RULE_DISTINCT = 'distinct',
    RULE_INDEX_BY = 'indexBy',
    RULE_WITH = 'with',
    RULE_WITH_JOIN = 'withJoin';

class Query extends Base {

  rules = {};
  db;

  constructor(config = {}) {
    super();
    this.setOwnProperties(config);
  }

  /*** getter object methods */

  /**
   * Gets the FORM part of the query.
   * @returns {string|Object|array|Map}
   */
  getFrom() {
    return this.rules[RULE_FROM] ?? '';
  }

  /**
   * Gets the join parts of the query.
   * @returns {string|Object}
   */
  getJoin() {
    return this.rules[RULE_JOIN] ?? '';
  }

  /**
   * Gets the HAVING part of the query.
   * @returns {*|Object|Array|string}
   */
  getHaving() {
    return this.rules[RULE_HAVING] ?? '';
  }

  /**
   * Gets the UNION part of the query.
   */
  getUnion() {
    return this.rules[RULE_UNION] ?? '';
  }

  /**
   * Gets the with relations.
   */
  getWith() {
    return this.rules[RULE_WITH] ?? '';
  }

  /**
   * Gets the GROUP BY part of the query
   * @returns {*|Object|Array|string}
   */
  getGroupBy() {
    return this.rules[RULE_GROUP_BY] ?? '';
  }

  /**
   * Gets the WHERE part of the query.
   * @returns {*|Object|Array|string}
   */
  getWhere() {
    return this.rules[RULE_WHERE] ?? '';
  }

  getParams() {
    return this.rules[RULE_PARAMS] ?? {};
  }

  getOrderBy() {
    return this.rules[RULE_ORDER_BY] ?? '';
  }

  getLimit() {
    return this.rules[RULE_LIMIT] ?? '';
  }

  getOffset() {
    return this.rules[RULE_OFFSET] ?? 0;
  }

  /**
   * Gets the SELECT part of the query.
   * @returns {*|Object|Array|string}
   */
  getSelect() {
    return this.rules[RULE_SELECT] ?? '';
  }

  getSelectOption() {
    return this.rules[RULE_SELECT_OPTION] ?? '';
  }

  getDistinct() {
    return Boolean(this.rules[RULE_DISTINCT] ?? false);
  }

  /**
   * Creates a DB command that can be used to execute this query.
   *
   * @public
   * @param {BaseConnection|null} db
   * @return {Command}
   */
  createCommand(db = null) {
    const connection = db ?? this.db;
    const {sql, params} = connection.getQueryBuilder().build(this);
    return connection.createCommand(sql, params);
  }

  /*** setter object methods */

  /**
   * Sets the value indicating whether to SELECT DISTINCT or not.
   *
   * @public
   * @param {boolean} stage
   * @return {Query}
   */
  distinct(stage = true) {
    this.rules[RULE_DISTINCT] = Boolean(stage);
    return this;
  }

  /**
   * Sets the SELECT part of the query.
   *
   * @public
   * @param {string|array|object|Expression|Map} columns
   * @param {string} option
   */
  select(columns, option = void 0) {
    this.rules[RULE_SELECT] = this.normalizeSelect(columns);
    if (option !== void 0) {
      this.rules[RULE_SELECT_OPTION] = option;
    }
    return this;
  }

  /**
   * Add more columns to the SELECT part of the query.
   *
   * @public
   * @param {string|array|object|Expression|Map} columns
   * @returns {Query}
   */
  addSelect(columns) {
    if (this.rules[RULE_SELECT] === void 0) {
      this.rules[RULE_SELECT] = this.normalizeSelect(columns);
    } else {
      this.rules[RULE_SELECT] = {
        ...this.rules[RULE_SELECT], ...this.normalizeSelect(columns),
      };
    }
    return this;
  }

  /**
   * Normalizes the SELECT columns passed to [[select()]] or [[addSelect()]]
   * @param {string|array|object|Expression|Map} columns
   * @returns {{}}
   */
  normalizeSelect(columns) {
    if (helper.instanceOf(columns, Expression)) {
      columns = [columns];
    } else if (typeof columns === 'string') {
      columns = helper.splitCommaString(columns);
    }

    let result = {};
    for (let key in columns) {
      let column = columns[key];
      if (helper.isNumber(key) === false) {
        result[key] = column;
        continue;
      }
      if (typeof column === 'string') {
        let match = /^(.*?)(?:\s+as\s+|\s+)([\w\-_\.]+)$/i.exec(column);
        if (match !== null && !helper.isNumber(match[2]) &&
            match[2].indexOf('.') === -1) {
          result[match[2]] = match[1];
          continue;
        }
        if (column.indexOf('(') === -1) {
          result[column] = column;
          continue;
        }
      }
      result[key] = column;
    }

    return result;
  }

  /**
   * Sets the parameters to be bound to the query.
   * @param params
   * @returns {Query}
   */
  params(params) {
    this.rules[RULE_PARAMS] = params;
    return this;
  }

  /**
   * Adds additional parameters to be bound to the query.
   * @param params
   * @return {Query}
   */
  addParams(params) {
    if (helper.empty(params)) {
      return this;
    }
    if (helper.empty(this.rules[RULE_PARAMS])) {
      this.rules[RULE_PARAMS] = params;
    } else {
      this.rules[RULE_PARAMS] = {...this.rules[RULE_PARAMS], ...params};
    }
    return this;
  }

  /**
   * Sets the LIMIT part of the query.
   * @param {number|Expression} limit
   * @return {Query}
   */
  limit(limit) {
    this.rules[RULE_LIMIT] = limit;
    return this;
  }

  /**
   * Sets the OFFSET part of the query.
   * @param {number|Expression} offset
   * @return {Query}
   */
  offset(offset) {
    this.rules[RULE_OFFSET] = offset;
    return this;
  }

  /**
   * Sets the OFFSET part of the query.
   * @public
   * @param {string|object|Expression} columns
   * @return {Query}
   */
  orderBy(columns) {
    this.rules[RULE_ORDER_BY] = void 0;
    return this.addOrderBy(columns);
  }

  /**
   * Added the ORDER BY part of the query.
   *
   * @public
   * @param columns
   * @returns {Query}
   */
  addOrderBy(columns) {
    if (!this.rules[RULE_ORDER_BY]) {
      this.rules[RULE_ORDER_BY] = [];
    }
    this.rules[RULE_ORDER_BY] = this.rules[RULE_ORDER_BY].concat(
        this.normalizeOrderBy(columns));
    return this;
  }

  /**
   * Added additional ORDER BY columns to the query.
   * @param {string|object|Expression} columns
   * @returns {*}
   */
  normalizeOrderBy(columns) {
    if (helper.empty(columns)) {
      return [];
    }
    if (helper.instanceOf(columns, Expression) || typeof columns === 'object') {
      return [columns];
    }
    let result = [];
    if (typeof columns === 'string') {
      helper.splitCommaString(columns).forEach((column) => {
        let match = column.match(/^(.*?)\s+(asc|desc)/i);
        if (match) {
          result.push(match[1] + ' ' + match[2].toUpperCase());
          return;
        }
        result.push(column + ' ASC');
      });
    }

    if (Array.isArray(columns)) {
      return columns;
    }

    return result;
  }

  /**
   * group key index for rows
   *
   * @public
   * @param {string} column
   * @returns {Query}
   */
  indexBy(column) {
    this.rules[RULE_INDEX_BY] = column;
    return this;
  }

  /**
   * Sets the HAVING part of the query.
   *
   *  @public
   * @param {array|{}} condition
   * @param {{}} params
   * @returns {Query}
   */
  having(condition, params = {}) {
    this.rules[RULE_HAVING] = condition;
    return this.addParams(params);
  }

  /**
   * Check condition params for methods filter<Condition|Having>
   * @param {{}|array} condition
   * @returns {boolean|boolean}
   */
  hasCondition(condition) {
    return Array.isArray(condition) && condition.length !== 0
        || typeof condition === 'object' && !helper.isEmpty(condition);
  }

  /**
   * Sets the HAVING part of the query.
   * @param condition
   * @returns {Query}
   */
  filterHaving(condition) {
    condition = this.filterCondition(condition);
    if (this.hasCondition(condition)) {
      this.having(condition);
    }
    return this;
  }

  orFilterHaving(condition) {
    condition = this.filterCondition(condition);
    if (this.hasCondition(condition)) {
      this.orHaving(condition);
    }
    return this;
  }

  andFilterHaving(condition) {
    condition = this.filterCondition(condition);
    if (this.hasCondition(condition)) {
      this.andHaving(condition);
    }
    return this;
  }

  /**
   * Adds a filtering condition for a specific column and allow the user to choose a filter operator.
   *
   * It adds an additional WHERE condition for the given field and determines the comparison operator
   * based on the first few characters of the given value.
   *
   * - `<`: the column must be less than the given value.
   * - `>`: the column must be greater than the given value.
   * - `<=`: the column must be less than or equal to the given value.
   * - `>=`: the column must be greater than or equal to the given value.
   * - `<>`: the column must not be the same as the given value.
   * - `=`: the column must be equal to the given value.
   * - If none of the above operators is detected, the `$defaultOperator` will be used.
   *
   * @param {string} name
   * @param {string} value
   * @param {string} defaultOperator
   * @return {Query}
   */
  andFilterCompare(name, valueRaw , defaultOperator = '=') {
    let {value, operator} = this.parseFilterCompare(valueRaw, defaultOperator);
    return this.andFilterWhere([operator, name, value]);
  }

  parseFilterCompare(valueRaw, defaultOperator) {
    let operator;
    let value = String(valueRaw);
    let regex = /^(<>|>=|>|<=|<|=)/;
    let match = regex.exec(rawValue);
    if (match) {
      operator = match[1];
      value = value.substr(operator.length);
    } else {
      operator = defaultOperator;
    }
    return {operator, value};
  }

  orFilterCompare(name, valueRaw, defaultOperator = 0) {
    let {value, operator} = this.parseFilterCompare(valueRaw, defaultOperator);
    return this.orFilterWhere([operator, name, value]);
  }

  /**
   * Added [and] having part of the query.
   *
   * @public
   * @param {*} condition
   * @param {{}} params
   */
  andHaving(condition, params = {}) {
    this.#andRules(RULE_HAVING, condition, params);
    return this;
  }

  /**
   * Added [or] having part of the query.
   *
   * @public
   * @param {*} condition
   * @param {{}} params
   */
  orHaving(condition, params = {}) {
    this.#orRules(RULE_HAVING, condition, params);
    return this;
  }

  /**
   * Added [or] rules to query
   *
   * @private
   * @param {string} ruleType
   * @param {*} condition
   * @param {{}} params
   */
  #orRules(ruleType, condition, params = {}) {
    if (this.rules[ruleType] === void 0) {
      this.rules[ruleType] = condition;
    } else {
      this.rules[ruleType] = ['or', this.rules[ruleType], condition];
    }
    this.addParams(params);
  }

  /**
   * Added [and] rules to query
   *
   * @private
   * @param {string} ruleType
   * @param {*} condition
   * @param {{}} params
   */
  #andRules(ruleType, condition, params = {}) {
    if (this.rules[ruleType] === void 0) {
      this.rules[ruleType] = condition;
    } else if (
        Array.isArray(this.rules[ruleType]) &&
        this.rules[ruleType][0] &&
        String(this.rules[ruleType][0]).toLowerCase() === 'and'
    ) {
      this.rules[ruleType].push(condition);
    } else {
      this.rules[ruleType] = ['and', this.rules[ruleType], condition];
    }
    this.addParams(params);
  }

  /**
   * Set WHERE condition part of the query.
   *
   * @public
   * @param condition
   * @param {{}} params
   * @returns {Query}
   */
  where(condition, params = {}) {
    this.rules[RULE_WHERE] = condition;
    return this.addParams(params);
  }

  /**
   * Added [and] where condition part of the query.
   *
   * @public
   * @param {{}|array} condition
   * @param {{}} params
   * @returns {Query}
   */
  andWhere(condition, params = {}) {
    this.#andRules(RULE_WHERE, condition, params);
    return this;
  }

  /**
   * Added [or] where condition part of the query.
   *
   * @public
   * @param {{}|array} condition
   * @param {{}} params
   * @returns {Query}
   */
  orWhere(condition, params = {}) {
    this.#orRules(RULE_WHERE, condition, params);
    return this;
  }

  /**
   * Set WHERE condition (excludes empty conditions from the query)
   *
   * @public
   * @param {{}|array} condition
   * @returns {Query}
   */
  filterWhere(condition) {
    condition = this.filterCondition(condition);
    if (this.hasCondition(condition)) {
      this.where(condition);
    }
    return this;
  }

  /**
   * Added [or] where condition (excludes empty conditions from the query)
   *
   * @public
   * @param {{}|array} condition
   * @returns {Query}
   */
  orFilterWhere(condition) {
    condition = this.filterCondition(condition);
    if (this.hasCondition(condition)) {
      this.orWhere(condition);
    }
    return this;
  }

  /**
   * Added [and] where condition (excludes empty conditions from the query)
   *
   * @public
   * @param {{}|array} condition
   * @returns {Query}
   */
  andFilterWhere(condition) {
    condition = this.filterCondition(condition);
    if (this.hasCondition(condition)) {
      this.andWhere(condition);
    }
    return this;
  }

  /**
   * Executes the query and returns all results as an array.
   *
   * @param db
   * @returns {*}
   */
  async all(db = null) {
    const command = this.createCommand(db);
    const result = await command.queryAll();
    await command.release();
    return result;
  }



  /**
   * Executes the query and returns map object { from: to}
   *
   * @param db - db connection
   * @param from - for key
   * @param to - for value
   * @returns {Promise<{}>}
   */
  async map(db, from, to) {
    const result = await this.all(db);
    const map = {};
    for(let i=0, l = result.rows.length; i <l; i++){
      map[result.rows[i][from]] = result.rows[i][to];
    }
    return map;
  }

  each(batchSize = 100) {

  }

  batch(batchSize = 100) {

  }

  /**
   * Set table or tables for current Query
   * @param {array|Expression|string|object|Map} tables
   * @example
   * ```js
   *
   * ```
   */
  from(tables) {
    let _tables;

    switch (true) {
      case helper.instanceOf(tables, Expression):
        _tables = [tables];
        break;
      case helper.instanceOf(tables, Map):
        _tables = {};
        for (let [key, value] of tables.entries()) {
          _tables[key] = value;
        }
        break;
      case typeof tables === 'string':
        _tables = helper.splitCommaString(tables);
        break;
      default:
        _tables = tables;
        break;
    }
    this.rules[RULE_FROM] = _tables;
    return this;
  }

  /**
   * Executes the query and returns a single row of result.
   *
   * @param db
   * @returns {*}
   */
  async one(db = null) {
    const command = this.createCommand(db);
    const result = await command.queryOne();
    await command.release()
    return result
  }

  /**
   * Returns the query result as a scalar value.
   *
   * @param db
   * @returns {*}
   */
  async scalar(db = null) {
    const command = this.createCommand(db);
    const result = await command.queryScalar();
    await command.release();
    return result
  }

  /**
   * @private
   * @param selectExpression
   * @param db
   * @returns {Command}
   */
  createScalarCommand(selectExpression, db = null) {
    if (
        !this.getDistinct() &&
        helper.empty(
            this.getGroupBy(),
            this.getHaving(),
            this.getUnion(),
            this.getWith(),
        )
    ) {
      let select = this.getSelect();
      let orderBy = this.getOrderBy();
      let limit = this.getLimit();
      let offset = this.getOffset();

      this.select([selectExpression]);
      this.orderBy([]);
      this.limit(null);
      this.offset(null);

      const command = this.createCommand(db ?? this.db);
      this.select(select);
      this.orderBy(orderBy);
      this.limit(limit);
      this.offset(offset);
      return command;
    }

    return (new Query({db: db ?? this.db}))
      .select([selectExpression])
      .from({c: this})
      .createCommand();
  }

  async #queryScalar(selectExpression, db = null) {
    const command = await this.createScalarCommand(selectExpression, db ?? this.db)
    const result = await command.queryScalar()
    await command.release()
    return result;
  }

  column(db = null) {

  }

  /**
   * Returns the number of records.
   *
   * @param sql
   * @param db
   * @returns {*}
   */
  async count(sql = '*', db = null) {
    return await this.#queryScalar(`COUNT(${sql})`, db);
  }

  /**
   * Returns the sum of the specified column values.
   *
   * @param sql
   * @param db
   * @returns {*}
   */
  async sum(sql, db = null) {
    return await this.#queryScalar(`SUM(${sql})`, db);
  }

  /**
   * Returns the average of the specified column values.
   *
   * @param sql
   * @param db
   * @returns {*}
   */
  async average(sql, db = null) {
    return await this.#queryScalar(`AVG(${sql})`, db);
  }

  /**
   * Returns the minimum of the specified column values.
   *
   * @param sql
   * @param db
   * @returns {*}
   */
  async min(sql, db = null) {
    return await this.#queryScalar(`MIN(${sql})`, db);
  }

  /**
   * Returns the maximum of the specified column values.
   *
   * @param {string} sql
   * @param db
   * @returns {*}
   */
  async max(sql, db = null) {
    return await this.#queryScalar(`MAX(${sql})`, db);
  }

  /**
   * Returns a value indicating whether the query result contains any row of data.
   * @param db
   * @returns {boolean}
   */
  async exists(db = null) {
    const command = this.createCommand(db ?? this.db);
    let params = this.getParams();
    command.sql = `SELECT EXISTS(${command.sql})`;
    command.bindValues(params);
    const result = Boolean(await command.queryScalar());
    await command.release();
    return result;
  }

  join(table, on, params, type= 'JOIN') {
    if (this.rules[RULE_JOIN] === void 0) {
      this.rules[RULE_JOIN] = [];
    }
    this.rules[RULE_JOIN].push([type.toUpperCase(), table, on]);
    this.addParams(params);
  }

  rightJoin(table, on, params) {
    this.join( table, on, params, 'RIGHT JOIN');
    return this;
  }

  leftJoin(table, on, params) {
    this.join( table, on, params, 'LEFT JOIN');
    return this;
  }

  innerJoin(table, on, params) {
    this.join( table, on, params, 'INNER JOIN');
    return this;
  }
  
  filterCondition(condition) {

    if (typeof condition !== 'object') {
      return condition;
    }

    if (!condition[0]) {
      for (let key in condition) {
        if (helper.isEmpty(condition[key])) {
          delete condition[key];
        }
      }
      return condition;
    }

    let operator = condition.shift();

    switch (operator.toUpperCase()) {
      case 'NOT':
      case 'AND':
      case 'OR':
        for (let key in condition) {
          const subCondition = this.filterCondition(condition[key]);
          if (helper.isEmpty(subCondition)) {
            delete condition[key];
          } else {
            condition[key] = subCondition;
          }
        }
        if (helper.isEmpty(condition)) {
          return [];
        }
        break;
      case 'BETWEEN':
      case 'NOT BETWEEN':
        if (condition[1] !== void 0 && condition[2] !== void 0) {
          if (helper.isEmpty(condition[1]) || helper.isEmpty(condition[2])) {
            return [];
          }
        }
        break;
      default:
        if (helper.isEmpty(condition[1])) {
          return [];
        }
    }
    condition.unshift(operator);
    return condition;
  }

  normalizeGroupBy(columns) {
    if (helper.instanceOf(columns, Expression)) {
      columns = [columns];
    } else if (typeof columns === 'string') {
      columns = helper.splitCommaString(columns);
    }
    return columns;
  }

  /**
   * Sets the GROUP BY part of the query.
   * @param columns
   * @returns {Query}
   */
  groupBy(columns) {
    this.rules[RULE_GROUP_BY] = void 0;
    this.addGroupBy(columns);
    return this;
  }

  /**
   * Adds additional group-by columns to the existing ones.
   * @param columns
   * @returns {Query}
   */
  addGroupBy(columns) {
    if (!this.rules[RULE_GROUP_BY]) {
      this.rules[RULE_GROUP_BY] = this.normalizeGroupBy(columns);
    } else {
      this.rules[RULE_GROUP_BY] = this.rules[RULE_GROUP_BY].concat(
          this.normalizeGroupBy(columns));
    }
    return this;
  }

  /**
   * Creates a new Query object and copies its property values from an existing one.
   * The properties being copies are the ones to be used by query builders.
   *
   * @param {Query} query
   * @return {Query}
   */
  static createFrom(query) {
    return new this({
      db: query.db,
      rules: query.rules,
      params: query.getParams(),
    });
  }

}

module.exports = Query;