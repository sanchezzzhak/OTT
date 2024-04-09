const fs = require('node:fs');
const path = require('node:path');
const Query = require('./query');
const OrderSort = require('./order-sort');
const Migration = require('./migration');
const MigrationManager = require('./migration-manager');
const Expression = require('./expression');

const SUPPORT_DRIVERS = [
  'pg',
  'clickhouse',
];

const configMap = {};
const instances = {};

class DBA {
  /**
   * get array support drivers for lib
   * @returns {[string]}
   */
  static getSupportDrives() {
    return SUPPORT_DRIVERS;
  }

  /**
   * get db connection
   * @param {string} configName
   * @param {{}} overwriteConfig
   * @returns {*}
   */
  static instance(configName = 'db', overwriteConfig = {}) {
    if (instances[configName] !== void 0) {
      return instances[configName];
    }

    let config = configMap[configName];
    if (!config) {
      throw new Error(`Config "${configName}" not found or not load`);
    }

    let driver = config['driver'];
    if (!driver) {
      throw new Error(`Not set section driver for config ${configName}`);
    }

    if (!SUPPORT_DRIVERS.includes(driver)) {
      throw new Error(`Unknown ${driver} driver`);
    }

    try {
      const Connection = require(`./${driver}/connection`);
      instances[configName] = new Connection({...config, ...overwriteConfig});
    } catch (err) {
      throw err;
    }

    return instances[configName] ?? {};
  }

  /**
   * load config for json or js files
   * @param dirPath
   */
  static loadConfigsForDir(dirPath) {
    fs.readdirSync(dirPath, {
      withFileTypes: true,
    }).filter((file => /\.(js|json)$/.test(file.name))).forEach((file => {
      let fileName = file.name;
      let name = path.parse(fileName).name;
      configMap[name] = require(dirPath + '/' + fileName);
    }));
  }
}

module.exports = {
  DBA,
  Query,
  OrderSort,
  Expression,
  Migration,
  MigrationManager,
};