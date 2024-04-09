const Base = require('./base');

class TableSchema extends Base {
  /**
   * @type {string} the name of the schema that this table belongs to.
   */
  schemaName;
  /**
   * @type {string} the name of this table. The schema name is not included. Use [[fullName]] to get the name with schema name prefix.
   */
  name;
  /**
   * @type {string} the full name of this table, which includes the schema name prefix, if any.
   * Note that if the schema name is the same as the [[Schema.defaultSchema|default schema name]],
   * the schema name will not be included.
   */
  fullName;
  /**
   * @type {{}} primary keys of this table.
   */
  primaryKey = {};
  /**
   * @type {string|null} sequence name for the primary key. Null if no sequence.
   */
  sequenceName = null;

  /**
   * @type {{}} foreign keys of this table.
   * @see structure for {ForeignKey} class
   */
  foreignKeys = {}
  /**
   * @type {{}} columns metadata of this table.
   */
  columns = {};

  constructor(config) {
    super();
    this.setOwnProperties(config);
  }

  /**
   * Gets the named column metadata.
   * This is a convenient method for retrieving a named column even if it does not exist.
   * @param {string} name
   */
  getColumn(name) {
    return this.columns[name] ?? null;
  }

  getColumnNames() {
    return Object.keys(this.columns);
  }


}

module.exports = TableSchema;