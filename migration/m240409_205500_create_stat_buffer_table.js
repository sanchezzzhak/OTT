
const {Migration} = require('node-dba');

class m240409_205500_create_stat_buffer_table extends Migration {

  table = 'stat_buffer';

  async up(){
    await this.createTable(this.table, {
      id: 'UUID',
      data: this.text(),
      status: this.integer().defaultValue(0),
      created_at: this.timestamp(),
      updated_at: this.timestamp()
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
