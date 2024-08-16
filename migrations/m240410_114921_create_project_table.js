
const {Migration} = require('node-dba');

class m240410_114921_create_project_table extends Migration {

  table = 'project'

  async up(){

    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      name: this.string(),
      token: this.string(),
      description: this.string(),
      status: this.integer(),
      created_at: this.timestamp().defaultExpression(this.currentTimestamp()),
      updated_at: this.timestamp().defaultExpression(this.currentTimestamp())
        .onUpdate(this.currentTimestamp()),
    });

    return true;
  }

  async down(){
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m240410_114921_create_project_table