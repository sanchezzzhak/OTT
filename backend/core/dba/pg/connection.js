const BaseConnection = require('../connection');
const Schema = require('./schema');
const Command = require('./command');
const QueryResult = require('../query-result');
const {Pool} = require('pg');

/**
 * @typedef ConfigPostgres
 * @property {string} applicationName
 * @property {string} host
 * @property {number} port
 * @property {string} database
 * @property {string} username
 * @property {string} password
 * @property {string} ssl
 * @property {number} poolSize
 * @property {number} idleTimeoutMillis
 * @property {number} connectTimeoutMS
 *
 * @property {ConfigPostgres[]} slaves
 */

class PgConnection extends BaseConnection {

  /*** @type {Object} lib */
  master;
  slaves = [];
  config = {};

  isReplicated = false;

  static get getDriverName() {
    return 'pg';
  }

  /**
   * @param {ConfigPostgres} config
   */
  constructor(config) {
    super(config);
    if (!config) {
      return;
    }
    this.config = config;
    this.isReplicated = config.slaves && config.slaves.length;
  }

  /**
   * Connect to master or slave+master
   * @returns {Promise<void>}
   */
  async connect() {
    if (this.master) {
      return;
    }
    if (this.isReplicated) {
      for (const config of this.config.slaves) {
        this.slaves.push(
            await this.createPool(config),
        );
      }
      this.master = await this.createPool(this.config.master);
    } else {
      this.master = await this.createPool(this.config);
    }
  }

  /**
   * Disconnect for current master or slave+master
   * @returns {Promise<void>}
   */
  async disconnect() {
    await this.closePool(this.master);

    await Promise.all(this.slaves.map((slave) => this.closePool(slave)));
    this.master = void 0;
    this.slaves = [];
  }

  /**
   * Close pool connection
   * @param pool
   * @returns {Promise<*>}
   */
  async closePool(pool) {
    if (!pool) {
      return;
    }

    return await pool.end();
  }

  /**
   * Create Pool on master or slaves+master
   * @param {ConfigPostgres|{}} options
   * @returns {Promise<void>}
   */
  async createPool(options) {

    const config = {
      application_name: options.applicationName ?? 'node-dba-client',
      host: options.host ?? 'localhost',
      database: options.database,
      user: options.username,
      password: options.password,
      port: options.port,
      ssl: options.ssl ?? void 0,
      idleTimeoutMillis: options.idleTimeoutMillis ?? 30000,
      connectionTimeoutMillis: options.connectTimeoutMS ?? 2000,
      max: options.poolSize ?? 30,
    };

    const pool = new Pool(config);

    pool.on('connect', (client) => {
       this.emit(this.EVENTS.CONNECT, {client});
    });

    pool.on('error', (err, client) => {
       this.emit(this.EVENTS.ERROR, {err, client});
    });

    return new Promise((resolve, reject) => {
      pool.connect(async (err, connection, release) => {
        if (err) {
          return reject(err);
        }
        try {
          let result = await pool.query('SELECT version();');
        } catch (err) {
          this.emit(this.EVENTS.ERROR, {err});
        }
        release();
        resolve(pool);
      });
    });
  }

  createCommand(sql = null, params = {}) {
    return new Command({
      db: this,
      sql,
      params,
    });
  }

  /**
   * get native client
   * @returns {Promise<*>}
   */
  async getNativeClient() {
    await this.connect();
    return await this.master.connect();
  }

  getSchema() {
    return new Schema({
      db: this,
    });
  }

  createQueryResult(sql, raw) {
    const result = new QueryResult();
    result.sql = String(sql);
    if (raw) {
      result.raw = raw;

      if (raw.hasOwnProperty('rows')) {
        result.rows = raw.rows;
      }
      if (raw.hasOwnProperty('rowCount')) {
        result.rowCount = raw.rowCount;
      }
    }
    return result;
  }

  /**
   * @param {string} sql
   * @returns {Promise<{result: QueryResult, client: *}>}
   */
  async execute(sql) {
    const client = await this.getNativeClient();
    const raw = await client.query(sql);
    await client.release(true);
    const result = this.createQueryResult(sql, raw);
    return {result, client};
  }


}

module.exports = PgConnection;
