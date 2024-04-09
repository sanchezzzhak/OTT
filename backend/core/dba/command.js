const helper = require('./helper');
const Base = require('./base');
const Expression = require('./expression');

class Command extends Base {
  /*** @type {PgConnection|BaseConnection} db */
  db;

  params = {};
  /*** @type {string} the SQL statement that this command represents */
  sql;

  constructor(config) {
    super();
    this.setOwnProperties(config);
    this.bindValues(config.params ?? {});
  }

  getRawSql() {
    if (helper.empty(this.params)) {
      return this.sql;
    }

    let params = {};
    for (let key in this.params) {
      let name = key;
      if (/^\d+$/.test(key) === false && helper.strncmp(name, ':', 1)) {
        name = ':' + key;
      }
      let value = this.params[key];
      if (typeof value === 'string' || helper.instanceOf(value, Expression)) {
        params[name] = this.db.quoteValue(String(value));
        continue;
      }
      if (typeof value === 'boolean') {
        params[name] = value ? 'TRUE' : 'FALSE';
        continue;
      }
      if (value === null) {
        params[name] = 'NULL';
        continue;
      }
      if (typeof value == 'number') {
        params[name] = value;
      } else if (/^\d[\d.]*$/.test(value)) {
        params[name] = value;
      }
    }

    if (!helper.empty(params)) {
      return helper.replaceCallback(/(:\w+)/g, (matches) => {
        let match = matches[1];
        return params[match] ?? match;
      }, String(this.sql));
    }

    return this.sql;
  }

  bindValues(params) {
    if (params === void 0) {
      return this;
    }

    for (let key in params) {
      this.params[key] = params[key];
    }

    return this;
  }

  async query() {

  }

  async queryOne() {
    return await this.#queryInternal('one');
  }

  async queryAll() {
    return await this.#queryInternal('all');
  }

  async queryColumn() {
    return await this.#queryInternal('column');
  }

  async queryScalar() {
    return await this.#queryInternal('scalar');
  }

  async #queryInternal(method) {
    return await this.execute();
  }

  /**
   * Creates an INSERT model command.
   * @param {ActiveRecord} model
   * @param {{}} values
   * @returns {Promise<*>}
   */
  async insertModel(model, values) {
    return await this.insert(model.constructor.tableName(), values);
  }

  /**
   * Creates an INSERT command.
   * @example
   * ```js
   *  db.createCommand().insert('user', {
   *    name: 'test-user',
   *    role: 'user',
   *    status: 1,
   *  })
   * ``
   * @param {string} table - the table that new rows() will be inserted into.
   * @param {{}} columns - the column data {name:value} to be inserted into the table.
   */
  async insert(table, columns) {
    let params = {};
    let sql = await this.db.getQueryBuilder().insert(table, columns, params);
    this.setSql(sql);
    this.bindValues(params);
    return await this.execute();
  }

  /**
   * Creates a batch INSERT command.
   * @example
   * ```js
   * db.createCommand().batchInsert('user', ['name', 'age'], [
   *     ['Tom', 21],
   *     ['Jerry', 20],
   *     ['Linda', 25],
   * ])
   * ``
   * @param {string} table - table the table that new rows() will be inserted into.
   * @param {[]} columns - columns the column names
   * @param {[]} rows - the rows to be batch inserted into the table
   */
  async batchInsert(table, columns, rows) {
    let sql = await this.db.getQueryBuilder().batchInsert(table, columns, rows);
    this.setSql(sql);
    return await this.execute();
  }

  /**
   * Creates an UPDATE command.
   * @example
   * ```js
   * db.createCommand().update('user', {status: 1}, 'age > 30')
   * ```
   * @param {string} table - the table to be updated.
   * @param {{}} columns - columns the column data {name:value} to be updated.
   * @param {string|[]|{}|Query} condition - the condition that will be put in the WHERE part
   * @param {{}} params - the parameters to be bound to the command
   * @returns {Promise<*>}
   */
  async update(table, columns, condition = '', params = {}) {
    let sql = await this.db.getQueryBuilder().
    update(table, columns, condition, params);
    this.setSql(sql);
    this.bindValues(params);
    return await this.execute();
  }

  /**
   * Creates an UPDATE AR model and execute command.
   * @example
   * ```
   *
   * ```
   * @param model
   * @param values
   * @returns {Promise<void>}
   */
  async updateModel(model, values) {
    let condition = {}; // todo add
    return await this.update(model.constructor.tableName(), values, condition);
  }

  /**
   * Specifies the SQL statement to be executed.
   *
   * @param {string} sql
   * @returns {Command}
   */
  setSql(sql) {
    this.sql = sql;
    return this;
  }

  /**
   * Creates a DELETE and execute command.
   * @example
   * ```js
   * db.createCommand().delete('user', 'status = 0')
   * db.createCommand().delete('user', {status: 0})
   * ```
   * @param {string} table - table the table where the data will be deleted from.
   * @param {string|{}|Query} condition - the condition that will be put in the WHERE part
   * @param {{}} params - the parameters to be bound to the command
   * @returns {Promise<*>}
   */
  async delete(table, condition = '', params = {}) {
    let sql = await this.db.getQueryBuilder().delete(table, condition, params);
    this.setSql(sql);
    this.bindValues(params);
    return await this.execute();
  }

  async upsert(table, insertColumns, updateColumns = true, params = {}) {
    let sql = await this.db.getQueryBuilder().
    upsert(table, insertColumns, updateColumns, params);
    this.setSql(sql);
    this.bindValues(params);
    return await this.execute();
  }

  /**
   * Creates a SQL and execute command for creating a new DB() table.
   *
   * @param {string} table - the name of the table to be created. The name will be properly quoted by the method.
   * @param {{}} columns - the columns (name => definition) in the new table.()
   * @param {null|string} options - additional SQL fragment that will be appended to the generated SQL.
   * @returns {Promise<*>}
   */
  async createTable(table, columns, options = null) {
    let sql = await this.db.getQueryBuilder().
    createTable(table, columns, options);
    this.setSql(sql);
    return await this.execute();
  }

  /**
   * Creates a SQL and execute command for renaming a DB table.
   *
   * @param {string} fromTable
   * @param {string} toTable
   * @returns {Promise<*>}
   */
  async renameTable(fromTable, toTable) {
    let sql = await this.db.getQueryBuilder().renameTable(fromTable, toTable);
    this.setSql(sql);
    return await this.execute();
  }

  /**
   * Creates a SQL and execute command  for renaming a DB table.
   *
   * @param {string} table
   * @returns {Promise<*>}
   */
  async truncateTable(table) {
    let sql = await this.db.getQueryBuilder().truncateTable(table);
    this.setSql(sql);
    return await this.execute();
  }

  /**
   * Creates a SQL and execute command for dropping a DB table.
   *
   * @param {string} table
   * @returns {Promise<*>}
   */
  async dropTable(table) {
    let sql = await this.db.getQueryBuilder().dropTable(table);
    this.setSql(sql);
    return await this.execute();
  }

  /**
   * Creates a SQL and execute command for adding a new DB column.
   *
   * @param {string} table
   * @param {string} column
   * @param {string|ColumnSchemaBuilder} type
   * @returns {Promise<*>}
   */
  async addColumn(table, column, type) {
    let sql = await this.db.getQueryBuilder().addColumn(table, column, type);
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for dropping a DB column.
   *
   * @param {string} table
   * @param {string} column
   * @returns {Promise<*>}
   */
  async dropColumn(table, column) {
    let sql = await this.db.getQueryBuilder().dropColumn(table, column);
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for renaming a column.
   *
   * @param {string} table
   * @param {string} fromColumn
   * @param {string} toColumn
   * @returns {Promise<*>}
   */
  async renameColumn(table, fromColumn, toColumn) {
    let sql = await this.db.getQueryBuilder().renameColumn(
        table,
        fromColumn,
        toColumn,
    );
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for changing the definition of a column.
   *
   * @param {string} table
   * @param {string} column
   * @param {string|ColumnSchemaBuilder} type
   * @returns {Promise<*>}
   */
  async alterColumn(table, column, type) {
    let sql = await this.db.getQueryBuilder().alterColumn(
        table,
        column,
        type,
    );
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for adding a primary key constraint to an existing table.
   *
   * @param {string} name
   * @param {string} table
   * @param {string|[]} columns
   * @returns {Promise<void>}
   */
  async addPrimaryKey(name, table, columns) {
    let sql = await this.db.getQueryBuilder().addPrimaryKey(
        name,
        table,
        columns,
    );
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for removing a primary key constraint to an existing table.
   *
   * @param {string} name
   * @param {string} table
   * @returns {Promise<*>}
   */
  async dropPrimaryKey(name, table) {
    let sql = await this.db.getQueryBuilder().dropPrimaryKey(name, table);
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for adding a foreign key constraint to an existing table.
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
   * @returns {Promise<*>}
   */
  async addForeignKey(
      name,
      table,
      columns,
      refColumns,
      refTable,
      onDelete = null,
      onUpdate = null,
  ) {
    let sql = await this.db.getQueryBuilder().addForeignKey(
        name,
        table,
        columns,
        refTable,
        refColumns,
        onDelete,
        onUpdate,
    );
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for dropping a foreign key constraint.
   * @param {string} name - the name of the foreign key constraint to be dropped. The name will be properly quoted by the method.
   * @param {string} table - the table whose foreign is to be dropped. The name will be properly quoted by the method.
   * @returns {Promise<*>}
   */
  async dropForeignKey(name, table) {
    let sql = await this.db.getQueryBuilder().dropForeignKey(name, table);
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  async resolveTableSchemaRefresh(table) {
    // todo add
  }

  /**
   * Creates a SQL and execute command for creating a new index.
   *
   * @param {string} name
   * @param {string} table
   * @param {string|[]} columns
   * @param {boolean} unique
   * @returns {Promise<*>}
   */
  async createIndex(name, table, columns, unique = false) {
    let sql = await this.db.getQueryBuilder().
    createIndex(name, table, columns, unique);
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  /**
   * Creates a SQL and execute command for dropping an index.
   *
   * @param {string} name
   * @param {string} table
   * @returns {Promise<*>}
   */
  async dropIndex(name, table) {
    let sql = await this.db.getQueryBuilder().dropIndex(name, table);
    this.setSql(sql);
    let result = await this.execute();
    await this.resolveTableSchemaRefresh(table);
    return result;
  }

  async release(){
    throw new Error('need implementation release() method for current class');
  }

  async execute() {
    throw new Error('need implementation execute() method for current class');
  }

}

module.exports = Command;