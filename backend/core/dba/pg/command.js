const BaseCommand = require('../command');

class Command extends BaseCommand {

  client;

  /**
   * Free client release
   *
   * @returns {Promise<void>}
   */
  async release() {
    if (this.client) {
      await this.client.release();
      this.client = void 0;
    }
  }

  /**
   * init client and add to pool
   *
   * @returns {Promise<boolean>}
   */
  async initClient() {
    if (!this.client) {
      this.client = await this.db.getNativeClient();
    }
    return true;
  }



  /**
   *
   * @param {function} next - async function
   * @param {boolean} release - free client for after call next fn;
   * @returns {Promise<*>} - Returns any data that was returned in next fn
   * @example
   * ```js
   *  let command = db.createCommand();
   *  let result = await command.transaction(async function(command) {
   *    return await command.insert('user', {username: 'Alex'})
   *  }, false)
   *
   *  //  or arrow function
   *
   *  let command = db.createCommand();
   *  let result = await command.transaction(async () => {
   *    return await command.insert('user', {username: 'Alex'})
   *  }, false)
   * ```
   */
  async transaction(next, release = false) {
    await this.initClient();
    try {
      await this.client.query('BEGIN');
      await next(this);
      await this.client.query('COMMIT');
    } catch (e) {
      await this.client.query('ROLLBACK');
      throw e;
    } finally {
      release ? await this.release() : null;
    }
  }

  /**
   * Execute command for current sql
   *
   * @returns {Promise<QueryResult>}
   */
  async execute() {
    await this.initClient();
    const sql = this.getRawSql();
    const raw = await this.client.query(sql);
    return this.db.createQueryResult(sql, raw);
  }
}

module.exports = Command;