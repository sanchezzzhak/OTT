
const {Migration} = require('node-dba');

class m240409_205500_create_stat_buffer_table extends Migration {

  table = 'stat_buffer';

  async up(){
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      data: this.text().comment('JSON raw data'),
      status: this.integer().defaultValue(0),
      created_at: this.timestamp().defaultExpression(this.currentTimestamp()),
      updated_at: this.timestamp().defaultExpression(this.currentTimestamp())
        .onUpdate(this.currentTimestamp()),
    });
    await this.createIndexConvention(this.table, ['status']);
    await this.createIndexConvention(this.table, ['created_at']);

    return true;
  }

  async down(){
    await this.dropTable(this.table);
    return true;
  }
}
module.exports = m240409_205500_create_stat_buffer_table
