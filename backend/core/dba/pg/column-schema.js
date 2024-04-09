const BaseColumnSchema = require('../column-schema');

class ColumnSchema extends BaseColumnSchema {

  /**
   * @type {number} the dimension of object.
   * Defaults to 0, means this column is not an object.
   */
  dimension;
  /**
   * @type {string} name of associated sequence if column is auto-incremental
   */
  sequenceName;

  constructor(config) {
    super(config);
    this.setOwnProperties(config);
  }

}

module.exports = ColumnSchema;