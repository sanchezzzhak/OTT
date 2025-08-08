
const {Migration} = require('node-dba');

class m250808_193016_create_monitor_event_type_table extends Migration {

  table = 'monitor_event_type';

  async up(){
    return true;
  }

  async down(){
    return true;
  }
}
module.exports = m250808_193016_create_monitor_event_type_table
