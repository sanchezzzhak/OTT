const helper = require('./helper');
const Base = require('./base');
const {DBA, Expression} = require('./index');

const lowerCaseTable = function(id, separator = '_') {
  return helper.words(id).join(separator).toLowerCase();
};

class ActiveRecord extends Base {

  static getDb() {
    return DBA.instance(this.getDbName());
  }

  /**
   * @return {String}
   */
  static getDbName() {
    throw new Error(
        `need implementation getDbName() method for current class "${helper.className(
            this)}"`);
  }

  /**
   * @return {String}
   */
  static tableName() {
    return lowerCaseTable(
        helper.className(this),
    );
  }

  refresh() {

  }

  static updateAll(attributes, condition, params = {}) {
    return this.getDb()
    .createCommand()
    .update(this.tableName(), attributes, params)
    .execute()
  }

  static updateAllCounters(counters, condition, params = {}) {
    const bindParams = {};
    let inc = 0;
    for (let [key, value] of Object.entries(counters)) {
      const bindParam = {};
      bindParam[`:bp${inc}`] = value;
      bindParams[key] = new Expression(`[[${name}]]+:bp${inc}`, bindParam);
      inc++;
    }
    return this.getDb().
    createCommand().
    update(this.tableName(), bindParams, condition, params).
    execute()

  }

  /**
   * Updates the whole table using the provided counter changes and conditions.
   * @param {Object|String} condition
   * @param {Object} params
   * @return {number}
   */
  static deleteAll(condition, params = {}) {
    return this.getDb().
    createCommand().
    delete(this.tableName(), condition, params).
    execute();
  }

  /**
   * @return {ActiveQuery}
   */
  static find() {
    return this.getDb().getActiveQuery();
  }

  hasOne(model, link) {
    return this.#createRelationQuery(model, link, false);
  }

  hasMany(model, link) {
    return this.#createRelationQuery(model, link, true);
  }

  #createRelationQuery(className, link, multiple) {
    let query = (className).find();
    query.primatyModel = this;
    query.link = link;
    query.multiple = multiple;
    return query;
  }

}

module.exports = ActiveRecord;