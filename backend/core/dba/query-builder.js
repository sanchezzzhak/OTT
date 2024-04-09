const helper = require('./helper');
const Expression = require('./expression');
const ExpressionBuilder = require('./expression-builder');
const Query = require('./query');
const Order = require('./sql/order');

const {
  SimpleCondition,
  HashCondition,
  ConjunctionCondition,
  ExistsCondition,
  NotCondition,
  BetweenCondition,
  InCondition,
  LikeCondition,
} = require('./conditions');

const {
  QueryExpressionBuilder,
  SimpleConditionBuilder,
  ConjunctionConditionBuilder,
  ExistsConditionBuilder,
  NotConditionBuilder,
  BetweenConditionBuilder,
  InConditionBuilder,
  LikeConditionBuilder,
  HashConditionBuilder,
} = require('./builders');

const PARAM_PREFIX = ':qp';
const COLUMN_SEPARATOR = ', ';

class QueryBuilder {
  /**
   * @type {Connection|PgConnection} - the database connection
   **/
  db;
  /**
   * @type {string} - the separator between different fragments of a SQL statement.
   */
  separator = ' ';

  conditionMap = {};
  typeMap = {};
  expressionBuilderMap = {};

  /**
   * @param db {Connection|PgConnection}
   */
  constructor(db) {
    this.db = db;
    this.conditionMap = {...this.getDefaultConditionMap(), ...this.conditionMap};
    this.expressionBuilderMap = {...this.getDefaultExpressionBuilderMap(), ...this.expressionBuilderMap};
  }

  getDefaultExpressionBuilderMap() {
    return {
      'Query': QueryExpressionBuilder,
      'ConjunctionCondition': ConjunctionConditionBuilder,
      'ExistsCondition': ExistsConditionBuilder,
      'NotCondition': NotConditionBuilder,
      'SimpleCondition': SimpleConditionBuilder,
      'BetweenCondition': BetweenConditionBuilder,
      'InCondition': InConditionBuilder,
      'LikeCondition': LikeConditionBuilder,
      'HashCondition': HashConditionBuilder,
    };
  }

  getDefaultConditionMap() {
    return {
      'NOT': NotCondition,
      'AND': ConjunctionCondition,
      'OR': ConjunctionCondition,
      'BETWEEN': BetweenCondition,
      'NOT BETWEEN': BetweenCondition,
      'IN': InCondition,
      'NOT IN': InCondition,
      'EXISTS': ExistsCondition,
      'NOT EXISTS': ExistsCondition,
      'LIKE': LikeCondition,
      'NOT LIKE': LikeCondition,
      'OR LIKE': LikeCondition,
      'OR NOT LIKE': LikeCondition,
    };
  }

  /**
   * find builder for map or create ExpressionBuilder
   * @param expresion
   * @returns {ExpressionBuilder}
   */
  getExpressionBuilder(expresion) {
    let className = helper.className(expresion);
    if (this.expressionBuilderMap[className] !== void 0) {
      return new (this.expressionBuilderMap[className])(this);
    }
    return new ExpressionBuilder(this);
  }

  /**
   * @param {Expression|Object} expression
   * @param {{}} params
   * @returns {string}
   */
  buildExpression(expression, params = {}) {
    const builder = this.getExpressionBuilder(expression);
    return builder.build(expression, params);
  }

  /**
   * Creates an FROM SQL statement.
   *
   * @param tables
   * @param params
   * @return {string}
   */
  buildFrom(tables, params) {
    if (helper.empty(tables)) {
      return '';
    }

    tables = this.quoteTableNames(tables, params);
    return 'FROM ' + tables.join(', ');
  }

  /**
   * Creates an JOIN SQL statement.
   * @param joins
   */
  buildJoin(joins, params) {
    if (helper.empty(joins)) {
      return '';
    }

    joins = [].concat(joins);

    for (let i = 0, l = joins.length; i < l; i++) {
      let join = joins[i];
      if (!Array.isArray(join)) {
        throw new Error(
            'join clause must be specified as an array of join type, join table, and optionally join condition.');
      }
      let joinType = join[0];
      let table = join[1];
      let tables = this.quoteTableNames([table], params);
      table = tables[0];
      joins[i] = joinType + ' ' + table;
      if (join[2]) {
        let condition = this.buildCondition(join[2], params);
        if (condition !== '') {
          joins[i] += ' ON ' + condition;
        }
      }
    }

    return joins.join(this.separator);
  }

  /**
   * Creates an WHERE SQL statement.
   *
   * @param condition
   * @param params
   * @return {string}
   */
  buildWhere(condition, params) {
    let where = this.buildCondition(condition, params);
    return (where === '' || where === void 0) ? '' : 'WHERE ' + where;
  }

  /**
   * Creates an GROUP BY SQL statement.
   *
   * @param {{}} columns
   * @return {string}
   */
  buildGroupBy(columns) {
    if (helper.empty(columns)) {
      return '';
    }
    let result = [];
    for (let key in columns) {
      let column = columns[key];
      if (column === void 0) {
        continue;
      }
      if (helper.instanceOf(column, Expression)) {
        let sqlPart = this.buildExpression(column);
        result.push(sqlPart);
      } else {
        result.push(this.db.quoteColumnName(column));
      }
    }

    return 'GROUP BY ' + result.join(COLUMN_SEPARATOR);
  }

  /**
   *
   * @param condition
   * @param {{}} params
   * @return {string}
   */
  buildHaving(condition, params) {
    let having = this.buildCondition(condition, params);
    return (having === '' || having === void 0) ? '' : 'HAVING ' + having;
  }

  /**
   * Creates a condition based on column-value pairs.
   *
   * @param {array|{}|string} condition
   * @param {{}} params
   * @returns {{}}
   */
  buildCondition(condition, params) {
    if (helper.empty(condition)) {
      return '';
    }
    if (typeof condition === 'object' || Array.isArray(condition)) {
      condition = this.createConditionFromArray(condition);
      if (helper.instanceOf(condition, Expression)) {
        return this.buildExpression(condition, params);
      }
    }

    return String(condition);
  }

  createConditionFromArray(condition) {
    if (Array.isArray(condition) && helper.isset(condition[0])) {
      let operator = condition[0].toUpperCase();
      let subCondition = [].concat(condition);
      subCondition.shift();
      if (helper.isset(this.conditionMap[operator])) {
        return new this.conditionMap[operator](operator, subCondition);
      }
      return new SimpleCondition(operator, subCondition);
    }

    return new HashCondition(condition);
  }

  /**
   * Creates an ORDER BY SQL statement.
   *
   * @param {array|Object|string|Expression|Order} columns
   * @return {string}
   */
  buildOrderBy(columns) {
    if (helper.empty(columns)) {
      return '';
    }
    let orders = Order.from(columns);
    let results = [];
    for (let order of orders) {
      if (order.expression) {
        results.push(
            this.buildExpression(order.expression),
        );
        continue;
      }
      let column = this.db.quoteColumnName(order.column);
      results.push(column + ' ' + order.direction);
    }

    return results.length > 0
        ? 'ORDER BY ' + results.join(COLUMN_SEPARATOR)
        : '';
  }

  /**
   * Creates an ORDER BY and LIMIT and OFFSET SQL statement.
   *
   * @param {string} sql
   * @param orderBy
   * @param {number} limit
   * @param {number} offset
   * @return {string}
   */
  buildOrderByAndLimit(sql, orderBy, limit, offset) {
    orderBy = this.buildOrderBy(orderBy);
    if (orderBy !== '') {
      sql += this.separator + orderBy;
    }
    limit = this.buildLimit(limit, offset);
    if (limit) {
      sql += this.separator + limit;
    }
    return sql;
  }

  /**
   * Creates an LIMIT and OFFSET SQL statement.
   *
   * @param {number} limit
   * @param {number} offset
   * @return string the LIMIT and OFFSET clauses
   */
  buildLimit(limit, offset) {
    let result = [];
    if (this.hasLimit(limit)) {
      result.push('LIMIT ' + limit);
    }
    if (this.hasOffset(offset)) {
      result.push('OFFSET ' + offset);
    }

    return result.join(' ');
  }

  /**
   * Quotes table names passed.
   * @param {array} tables
   * @param {Object} params
   * @returns {*}
   * @todo added expresion.build
   */
  quoteTableNames(tables, params) {
    for (let i in tables) {
      let table = tables[i];

      if (helper.instanceOf(table, Expression)) {
        tables[i] = this.buildExpression(table, params);
        continue;
      }

      if (helper.instanceOf(table, Query)) {
        let {sql, params} = this.build(table, params);
        tables[i] = '(' + sql + ') ' + this.db.quoteTableName(i);
        continue;
      }

      if (typeof table === 'string' && /^\d+$/.test(i) === false && i !==
          table) {
        if (table.indexOf('(') === -1) {
          table = this.db.quoteTableName(table);
        }
        tables[i] = table + ' ' + this.db.quoteTableName(i);
        continue;
      }

      if (helper.strncmp(table, '(') === false) {
        let tableWithAlias = this.extractAlias(table);
        if (tableWithAlias) {
          tables[i] = this.db.quoteTableName(tableWithAlias[0]) + ' AS ' +
              this.db.quoteTableName(tableWithAlias[1]);
        } else {
          tables[i] = this.db.quoteTableName(table);
        }
      }
    }

    return typeof tables === 'object'
        ? Object.values(tables)
        : tables;
  }

  /**
   * Extracts table alias if there is one or returns null
   *
   * @param {string} entity
   * @returns {array|null}
   */
  extractAlias(entity) {
    let regex = /^(.*?)(?:\s+as|)\s+([^ ]+)$/i;
    let match = regex.exec(entity);
    if (match) {
      return [match[1], match[2]];
    }
    return null;
  }

  /**
   * Generate select part sql
   *
   * @param columns
   * @param params
   * @param distinct
   * @param selectOption
   * @returns {string}
   */
  buildSelect(columns, params, distinct, selectOption = '') {
    let select = 'SELECT';
    if (distinct) {
      select += ' DISTINCT';
    }

    if (selectOption) {
      select += ' ' + selectOption;
    }

    if (helper.empty(columns)) {
      select += ' *';
    }

    let result = [];
    for (let key in columns) {
      let column = columns[key];
      if (column === void 0) {
        continue;
      }

      if (helper.instanceOf(column, Expression)) {
        let sqlPart = this.buildExpression(column, params);
        if (Number.isFinite(key)) {
          result.push(sqlPart);
        } else {
          result.push(sqlPart + ' AS ' + this.db.quoteColumnName(key));
        }
        continue;
      }
      if (helper.instanceOf(column, Query)) {
        let {sql, params} = this.build(column, params);
        result.push(`(${sql}) AS ` + this.db.quoteColumnName(key));
        continue;
      }
      if (/^\d+$/.test(key) === false && key !== column) {
        let sqlPart = String(column);
        if (column.indexOf('(') === -1) {
          sqlPart = this.db.quoteColumnName(column);
        }
        result.push(sqlPart + ' AS ' + this.db.quoteColumnName(key));
        continue;
      }

      if (column.indexOf('(') === -1) {
        let columnWithAlias = this.extractAlias(column);
        if (columnWithAlias !== null) {
          result.push(
              this.db.quoteColumnName(columnWithAlias[0]) + ' AS ' +
              this.db.quoteColumnName(columnWithAlias[1]),
          );
          continue;
        }
        result.push(this.db.quoteColumnName(column));
      }
    }

    return (select + ' ' + result.join(', ')).trim();
  }

  /***
   * Generates a SELECT SQL statement from a {Query} object.
   *
   * @param {Query} query
   * @param {object} parameters
   */
  build(query, parameters = {}) {
    let params = helper.merge(parameters ?? {}, query.getParams());
    let clauses = [];

    clauses.push(
        this.buildSelect(
            query.getSelect(),
            params,
            query.getDistinct(),
            query.getSelectOption(),
        ),
        this.buildFrom(query.getFrom(), params),
        this.buildJoin(query.getJoin(), params),
        this.buildWhere(query.getWhere(), params),
        this.buildGroupBy(query.getGroupBy()),
        this.buildHaving(query.getHaving(), params),
    );
    clauses = clauses.filter(value => value !== '');
    let sql = clauses.join(this.separator);

    sql = this.buildOrderByAndLimit(sql,
        query.getOrderBy(),
        query.getLimit(),
        query.getOffset(),
    );

    return {sql, params};
  }

  /**
   * Helper method to add value to params array using [[PARAM_PREFIX]]
   * return placeholder name
   *
   * @param value
   * @param {{}} params - passed by reference
   * @returns {string}
   */
  bindParam(value, params = {}) {
    let placeholderName = PARAM_PREFIX + helper.count(params);
    params[placeholderName] = value;
    return placeholderName;
  }

  /**
   * Checks to see if the given limit is effective.
   *
   * @param limit
   * @returns {boolean}
   */
  hasLimit(limit) {
    return helper.instanceOf(limit, Expression) || helper.isNumber(limit);
  }

  /**
   * Checks to see if the given offset is effective.
   *
   * @param offset
   * @returns {boolean}
   */
  hasOffset(offset) {
    return helper.instanceOf(offset, Expression) ||
        (helper.isNumber(offset) && String(offset) !== '0');
  }

  /**
   * Creates an UPDATE SQL statement.
   *
   * @param {string} table
   * @param {Object} columns
   * @param {Object|String|array} condition
   * @param {Object} conditionParams
   * @return {string}
   */
  update(table, columns, condition, conditionParams) {
    let [sets, params] = this.#prepareUpdateSets(table, columns,
        conditionParams);
    const sql = `UPDATE ${this.db.getTableSchema(table)} SET ${sets.join(
        sets)}`;
    const where = this.buildWhere(condition, params);
    return where === '' ? sql : `${sql} ${where}`;
  }

  /**
   * Creates an DELETE SQL statement.
   *
   * @param {string} table - the table where the data will be deleted from.
   * @param {{}} columns
   * @param {{}} params
   * @returns {Promise<string>}
   */
  async delete(table, columns, params = {}) {
    let sql = `DELETE FROM ${this.db.quoteTableName(table)}`;
    let where = this.buildWhere(columns, params);
    return where === '' ? sql : sql + ' ' + where;
  }

  /**
   * Creates an INSERT SQL statement.
   *
   * @param {string} table - the table that new rows will be inserted into.
   * @param {{}} columns
   * @param {{}} params
   */
  async insert(table, columns, params = {}) {
    let {
      names,
      placeholders,
      values,
    } = await this.#prepareInsertValues(table, columns, params);

    return `INSERT INTO ${this.db.quoteTableName(table)}` +
        (!helper.empty(names) ? ' (' + names.join(', ') + ')' : '') +
        (!helper.empty(placeholders) ? ' VALUES (' + placeholders.join(', ') +
            ')' : values);
  }

  async batchInsert(table, columns, rows, params) {
    if (helper.empty(rows)) {
      return '';
    }
  }

  /**
   * Builds a SQL statement for creating a new DB table.
   *
   * @param table
   * @param columns
   * @param options
   * @returns {Promise<string>}
   */
  async createTable(table, columns, options = null) {
    const sets = [];
    for (let [column, type] of Object.entries(columns)) {
      sets.push(
          `\t${this.db.quoteColumnName(column)} ${this.getColumnType(type)}`);
    }
    let sql = `CREATE TABLE ${this.db.quoteTableName(table)} (\n${sets.join(
        ',\n')} \n)`;
    return null === options ? sql : `${sql} ${options}`;
  }

  /**
   * Builds a SQL statement for dropping a DB table.
   *
   * @param {string} table
   * @returns {Promise<string>}
   */
  async dropTable(table) {
    return `DROP TABLE ${this.db.quoteTableName(table)}`;
  }

  /**
   * Builds a SQL statement for renaming a DB table.
   *
   * @param {string}  fromTable
   * @param {string}  toTable
   * @returns {Promise<string>}
   */
  async renameTable(fromTable, toTable) {
    return `RENAME TABLE ${this.db.quoteTableName(
        fromTable)} TO ${this.db.quoteTableName(toTable)}`;
  }

  /**
   * Builds a SQL statement for truncating a DB table.
   *
   * @param {string} table
   * @returns {Promise<string>}
   */
  async truncateTable(table) {
    return `TRUNCATE TABLE ${this.db.quoteTableName(table)}`;
  }

  /**
   * Builds a SQL statement for adding a primary key constraint to an existing table.
   *
   * @param {string} name
   * @param {string} table
   * @param {string|[]} columns
   * @returns {Promise<string>}
   */
  async addPrimaryKey(name, table, columns) {
    if (typeof columns === 'string') {
      columns = helper.splitCommaString(columns);
    }
    for (let key in columns) {
      columns[key] = this.db.quoteColumnName(columns[key]);
    }
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} ADD CONSTRAINT ${this.db.quoteColumnName(
        name)} PRIMARY KEY (${columns.join(', ')})`;
  }

  /**
   * Builds a SQL statement for removing a primary key constraint to an existing table.
   *
   * @param {string} name
   * @param {string} table
   * @returns {Promise<string>}
   */
  async dropPrimaryKey(name, table) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} DROP CONSTRAINT ${this.db.quoteColumnName(name)}`;
  }

  /**
   * Builds a SQL statement for adding a new DB column.
   *
   * @param {string} table
   * @param {string} column
   * @param {string} type
   * @returns {Promise<string>}
   */
  async addColumn(table, column, type) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} ADD ${this.db.quoteColumnName(column)} ${this.getColumnType(
        type)}`;
  }

  /**
   * Builds a SQL statement for dropping a DB column.
   *
   * @param {string} table
   * @param {string} column
   * @returns {Promise<string>}
   */
  async dropColumn(table, column) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} DROP COLUMN  ${this.db.quoteColumnName(column)}`;
  }

  /**
   * Builds a SQL statement for renaming a column.
   *
   * @param {string} table
   * @param {string} fromColumn
   * @param {string} toColumn
   * @returns {Promise<string>}
   */
  async renameColumn(table, fromColumn, toColumn) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} RENAME COLUMN ${this.db.quoteColumnName(
        fromColumn)} TO ${this.db.quoteColumnName(toColumn)}`;
  }

  /**
   * Builds a SQL statement for adding a foreign key constraint to an existing table.
   * The method will properly quote the table and column names.
   *
   * @param {string} name - the name of the foreign key constraint.
   * @param {string} table - the table that the foreign key constraint will be added to.
   * @param {string|[]} columns - the name of the column to that the constraint will be added on.
   * If there are multiple columns, separate them with commas or use an array to represent them.
   * @param {string} refTable - the table that the foreign key references to.
   * @param {string|[]} refColumns -  the name of the column that the foreign key references to.
   * * If there are multiple columns, separate them with commas or use an array to represent them.
   * @param {null|string} onDelete - the ON DELETE option. Most DBMS support these options: RESTRICT, CASCADE, NO ACTION, SET DEFAULT, SET NULL
   * @param {null|string} onUpdate - the ON UPDATE option. Most DBMS support these options: RESTRICT, CASCADE, NO ACTION, SET DEFAULT, SET NULL
   * @returns {Promise<string>}
   */
  async addForeignKey(
      name,
      table,
      columns,
      refTable,
      refColumns,
      onDelete,
      onUpdate,
  ) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} ADD CONSTRAINT ${this.db.quoteColumnName(
        name)} FOREIGN KEY (${this.buildColumns(
        columns)}) REFERENCES ${this.db.quoteTableName(
        refTable)} (${this.buildColumns(
        refColumns)})${(onDelete !== null
        ? ' ON DELETE ' + onDelete
        : '')}${(onUpdate !== null)
        ? ' ON UPDATE ' + onUpdate
        : ''}`;
  }

  /**
   * Builds a SQL statement for dropping a foreign key constraint.
   * @param {string} name
   * @param {string} table
   * @returns {Promise<string>}
   */
  async dropForeignKey(name, table) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} ROP CONSTRAINT ${this.db.quoteColumnName(name)}`;
  }

  /**
   * Builds a SQL statement for creating a new index.
   *
   * @param {string} name
   * @param {string} table
   * @param {string|[]} columns
   * @param {boolean} unique
   * @returns {Promise<string>}
   */
  async createIndex(name, table, columns, unique = false) {
    return `CREATE ${(unique
        ? 'UNIQUE INDEX'
        : 'INDEX')} ${this.db.quoteColumnName(
        name)} ON ${this.db.quoteTableName(table)} (${this.buildColumns(
        columns)})`;
  }

  /**
   * Builds a SQL statement for dropping an index.
   *
   * @param {string} name
   * @param {string} table
   * @returns {Promise<string>}
   */
  async dropIndex(name, table) {
    return `DROP INDEX ${this.db.quoteColumnName(
        name)} ON ${this.db.quoteTableName(table)}`;
  }

  /**
   * Processes columns and properly quotes them if necessary.
   * It will join all columns into a string with comma as separators.
   *
   * @param {string|[]} columns
   * @returns {string}
   */
  buildColumns(columns) {
    if (typeof columns === 'string') {
      if (columns.indexOf('(') !== -1) {
        return columns;
      }
      columns = helper.splitCommaString(columns);
    }
    for (let key in columns) {
      if (helper.instanceOf(columns[key], Expression)) {
        columns[key] = this.buildExpression(columns[key]);
      } else if (String(columns[key]).indexOf('(') === -1) {
        columns[key] = this.db.quoteColumnName(columns[key]);
      }
    }

    return columns.join(', ');
  }

  /**
   * Builds a SQL statement for changing the definition of a column.
   *
   * @param {string} table
   * @param {string} column
   * @param {string} type
   * @returns {Promise<string>}
   */
  async alterColumn(table, column, type) {
    return `ALTER TABLE ${this.db.quoteTableName(
        table)} CHANGE ${this.db.quoteColumnName(
        column)} ${this.getColumnType(type)}`;
  }

  getColumnType(type) {
    let matches;
    if (helper.isset(this.typeMap[type])) {
      return this.typeMap[type];
    }
    matches = /^(\w+)\((.+?)\)(.*)$/.exec(type);
    if (matches !== null) {
      if (helper.isset(this.typeMap[matches[1]])) {
        return String(this.typeMap[matches[1]]).
        replace(/\(.+\)/, '(' + matches[2] + ')') + matches[3];
      }
      return type;
    }
    matches = /^(\w+)\s+/.exec(type);
    if (matches !== null) {
      if (helper.isset(this.typeMap[matches[1]])) {
        return String(type).
        replace(/^\w+/, this.typeMap[matches[1]]);
      }
    }

    return type;
  }

  /**
   * Prepares a `VALUES` part for an `INSERT` SQL statement.
   *
   * @param table
   * @param columns
   * @param params
   * @returns {Promise<{names: [], values: string, placeholders: [], params: *}>}
   */
  async #prepareInsertValues(table, columns, params) {
    let names = [];
    let placeholders = [];
    let values = ' DEFAULT VALUES';
    let tableSchema = await this.db.getTableSchema(table);
    if (helper.instanceOf(columns, Query)) {
      let data = this.#prepareInsertSelectSubQuery(columns, params);
    } else {
      const columnSchemas = tableSchema !== null ? tableSchema.columns : {};
      for (let [column, value] of Object.entries(columns)) {
        names.push(this.db.quoteColumnName(column));
        let val = helper.isset(columnSchemas[column])
            ? columnSchemas[column].dbTypecast(value)
            : value;
        if (helper.instanceOf(val, Expression)) {
          placeholders.push(this.buildExpression(val, params));
        } else if (helper.instanceOf(val, Query)) {
          let data = this.build(val, params);
          placeholders.push(`(${data.sql})`);
        } else {
          placeholders.push(this.bindParam(val, params));
        }
      }
    }
    return {names, values, placeholders};
  }

  async #prepareInsertSelectSubQuery(columns, params) {
    let data = this.build(columns, params);
    let names = [];
    let values = ` ${data.sql}`;
    for (let [column, value] of Object.entries(columns.getSelect())) {
      if (typeof column === 'string') {
        names.push(this.db.quoteColumnName(column));
        continue;
      }
      let matches = /^(.*?)(?:\s+[aA][sS]\s+|\s+)([\w\-_.]+)$/.exec(value);
      if (matches) {
        names.push(this.db.quoteColumnName(matches[2]));
        continue;
      }
      names.push(this.db.quoteColumnName(value));
    }
    return {names, values, params};
  }

  /**
   * Prepares a `SET` parts for an `UPDATE` SQL statement.
   *
   * @param {string} table
   * @param {Object} columns
   * @param {Object} params
   * @return {{sets: [], params: *}}
   */
  async #prepareUpdateSets(table, columns, params) {
    const sets = [];
    const tableSchema = await this.db.getTableSchema(table);
    const columnSchemas = tableSchema !== null ? tableSchema.columns : {};

    for (let [column, value] of Object.entries(columns)) {
      let placeholder;
      value = helper.isset(columnSchemas[column])
          ? columnSchemas[column].dbTypecast(value)
          : value;
      if (helper.instanceOf(value, Expression)) {
        placeholder = this.buildExpression(value, params);
      } else {
        placeholder = this.bindParam(value, params);
      }
      sets.push(`${this.db.quoteColumnName(column)}=${placeholder}`);
    }
    return {sets, params};
  }

}

module.exports = QueryBuilder;