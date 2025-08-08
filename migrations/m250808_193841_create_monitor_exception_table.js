
const {Migration} = require('node-dba');

class m250808_193841_create_monitor_exception_table extends Migration {

  table = 'monitor_exception'

  async up(){
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      event_id: this.uuid().notNull(),
      type: this.string().null(),
      value: this.text().null(),
      module: this.text().null(),
    });
    /*  INDEX ON (event_id) */
    return true;

  }


  async down(){
    await this.dropTable(this.table)
    return true;
  }
}
module.exports = m250808_193841_create_monitor_exception_table
