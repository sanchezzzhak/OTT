const ActiveRecord = require('node-dba/active-record');

class User extends ActiveRecord {

  static getDbName() {
    return 'pg';
  }

}

module.exports = User;
