const ActiveRecord = require('../../active-record');

class CarRotate extends ActiveRecord
{
  static getDbName(){
    return 'pg';
  }
}

module.exports = CarRotate