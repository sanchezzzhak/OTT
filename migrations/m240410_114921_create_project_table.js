
const {Migration} = require('node-dba');

class m240410_114921_create_project_table extends Migration {

  table = 'project'

  async up(){

    await this.createTable(this.table, {
      id: this.primaryKey(),
      name: this.string(),
    });

    return true;
  }

  async down(){
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m240410_114921_create_project_table