const ActiveRecord = require('node-dba/active-record');

class StatBuffer extends ActiveRecord {

  static getDbName() {
    return 'pg';
  }

}

module.exports = StatBuffer;