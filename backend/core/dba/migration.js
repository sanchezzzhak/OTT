const SchemaTypes = require('./consts/schema-types');

class Migration {

  db;

  constructor(options) {
    this.db = options.db ?? null;
  }

  /**
   * This method contains the logic to be executed when applying this migration.
   * This method differs from [[up()]] in that the DB logic implemented here will
   * be enclosed within a DB transaction.
   * Child classes may implement this method instead of [[up()]] if the DB logic
   * needs to be within a transaction.
   *
   * @returns {Promise<boolean>}
   */
  async up() {
    return true;
  }

  /**
   * This method contains the logic to be executed when removing this migration.
   * This method differs from [[down()]] in that the DB logic implemented here will
   * be enclosed within a DB transaction.
   * Child classes may implement this method instead of [[down()]] if the DB logic
   * needs to be within a transaction.
   *
   * @returns {Promise<boolean>}
   */
  async down() {
    return true;
  }

  /**
   * Builds and executes a SQL statement for creating a new DB table.
   *
   * @param {string} table
   * @param {{}} columns
   * @param {string|null} options
   * @returns {Promise<void>}
   */
  async createTable(table, columns, options = null) {
    await this.db.createCommand().createTable(table, columns, options);
    for (let [type, column] of Object.entries(columns)) {
      // added comment to column
    }
  }

  /**
   * Builds and executes a SQL statement for dropping a DB table.
   *
   * @param {string} table
   * @returns {Promise<void>}
   */
  async dropTable(table) {
    return await this.db.createCommand().dropTable(table);
  }

  /**
   * Builds and executes a SQL statement for renaming a DB table.
   *
   * @param {string} fromTable
   * @param {string} toTable
   * @returns {Promise<void>}
   */
  async renameTable(fromTable, toTable) {
    return await this.db.createCommand().renameTable(fromTable, toTable);
  }

  /**
   * Generate base index name by standard convention naming indexes
   *
   * @param {string} tableName
   * @param {array|string} column
   * @param {boolean} isUnique
   * @returns {string}
   */
  getIndexName(tableName, column, isUnique = false) {
    let suffixQ = isUnique ? 'q' : '';
    let columns = Array.isArray(column) ? column.join('_') : column;
    return `idx${suffixQ}_${tableName}-${columns}`
  }

  /**
   * Builds and executes a SQL statement for create index a DB table (use standard convention naming indexes).
   *
   * @param {string} tableName
   * @param {array|string} column
   * @param {boolean} isUnique
   * @returns {Promise<any>}
   */
  async createIndexConvention(tableName, column, isUnique = false) {
    const name = this.getIndexName(tableName, column, isUnique);
    return await this.createIndex(name, tableName, column, isUnique);
  }

  /**
   * Builds and executes a SQL statement for drop index a DB table (use standard convention naming indexes).
   *
   * @param {string} tableName
   * @param {array|string} column
   * @param {boolean} isUnique
   * @returns {Promise<any>}
   */
  async dropIndexConvention(tableName, column, isUnique = false) {
    const name = this.getIndexName(tableName, column, isUnique);
    return await this.dropIndex(name, tableName, column, isUnique);
  }

  /**
   * Builds and executes a SQL statement for create index a DB table.
   *
   * @param {string} name
   * @param {string} tableName
   * @param {array|string} column
   * @param {boolean} isUnique
   * @returns {Promise<any>}
   */
  async createIndex(name, tableName, column, isUnique = false) {
    return await this.db.createCommand().createIndex(name, tableName, column, isUnique);
  }

  /**
   * Builds and executes a SQL statement for drop index a DB table.
   *
   * @param {string} name
   * @param {string} tableName
   * @returns {Promise<any>}
   */
  async dropIndex(name, tableName) {
    return await this.db.createCommand().dropIndex(name, tableName);
  }

  /**
   * Builds and executes a SQL statement for truncating a DB table.
   *
   * @param {string} table
   * @returns {Promise<any>}
   */
  async truncateTable(table) {
    return await this.db.createCommand().truncateTable(table);
  }

  /**
   * Creates a primary key column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  primaryKey(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_PK, length);
  }

  /**
   * Creates a big primary key column.
   *
   * @param {number|null}  length
   * @returns {*|ColumnSchemaBuilder}
   */
  bigPrimaryKey(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_BIGPK, length);
  }

  /**
   * Creates a char column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  char(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_CHAR, length);
  }

  /**
   * Creates a string column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  string(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_STRING, length);
  }

  /**
   * Creates a text column.
   *
   * @returns {*|ColumnSchemaBuilder}
   */
  text() {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_TEXT);
  }

  /**
   *  Creates a tinyint column. If tinyint is not supported by the DBMS, smallint will be used.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  tinyInteger(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_TINYINT, length);
  }

  /**
   * Creates a smallint column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  smallInteger(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_SMALLINT, length);
  }

  /**
   * Creates an integer column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  integer(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_INTEGER, length);
  }

  /**
   * Creates a bigint column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  bigInteger(length) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_BIGINT, length);
  }

  /**
   * Creates a float column.
   *
   * @param {number|null} precision
   * @returns {*|ColumnSchemaBuilder}
   */
  float(precision = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_FLOAT, precision);
  }

  /**
   * Creates a double column.
   *
   * @param {number|null} precision
   * @returns {*|ColumnSchemaBuilder}
   */
  double(precision = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_DOUBLE, precision);
  }

  /**
   * Creates a decimal column.
   *
   * @param {number|null} precision
   * @param {number|null} scale
   * @returns {*|ColumnSchemaBuilder}
   */
  decimal(precision = null, scale = null) {
    let length = [];
    if (precision !== null) {
      length.push(precision);
    }
    if (scale !== null) {
      length.push(scale);
    }
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_DECIMAL, length);
  }

  /**
   * Creates a datetime column.
   * @param {number|null} precision
   * @returns {*|ColumnSchemaBuilder}
   */
  dateTime(precision = null){
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_DATETIME, precision);
  }

  /**
   * Creates a timestamp column.
   *
   * @param {number|null} precision
   * @returns {*|ColumnSchemaBuilder}
   */
  timestamp(precision = null){
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_TIMESTAMP, precision);
  }

  /**
   * Creates a time column.
   *
   * @param {number|null} precision
   * @returns {*|ColumnSchemaBuilder}
   */
  time(precision = null){
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_TIME, precision);
  }

  /**
   * Creates a date column
   *
   * @returns {*|ColumnSchemaBuilder}
   */
  date() {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_DATE);
  }

  /**
   * Creates a binary column.
   *
   * @param {number|null} length
   * @returns {*|ColumnSchemaBuilder}
   */
  binary(length = null) {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_BINARY, length);
  }

  /**
   * Creates a boolean column.
   *
   * @returns {*|ColumnSchemaBuilder}
   */
  boolean() {
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_BOOLEAN);
  }

  /**
   * Creates a money column.
   * @param {number|null} precision
   * @param {number|null} scale
   */
  money(precision = null, scale = null) {
    let length = [];
    if (precision !== null) {
      length.push(precision);
    }
    if (scale !== null) {
      length.push(scale);
    }
    return this.db.createColumnSchemaBuilder(SchemaTypes.TYPE_MONEY, length);
  }

}

module.exports = Migration;