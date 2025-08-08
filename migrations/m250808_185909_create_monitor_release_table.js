
const {Migration} = require('node-dba');

class m250808_185909_create_monitor_release_table extends Migration {

  table = 'monitor_release';

  async up(){

    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      project_id: this.uuid().notNull(),
      description: this.string().null(),
      version: this.string().notNull(),
      created_at: this.timestamp().defaultExpression(this.currentTimestamp()),
    });

    return true;
  }

  async down(){
    await this.dropTable(this.table)
    return true;
  }
}
module.exports = m250808_185909_create_monitor_release_table
