
const {Migration} = require('node-dba');

class m240410_145829_create_setting_table extends Migration {

  table = 'setting';

  async up(){
    await this.createTable(this.table, {
      name: this.string().notNull(),
      value: this.string().defaultExpression('NULL'),
    });
    return true;
  }

  async down(){
    await this.dropTable(this.table);
    return true;
  }
}
module.exports = m240410_145829_create_setting_table
