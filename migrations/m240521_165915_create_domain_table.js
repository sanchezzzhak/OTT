
const {Migration} = require('node-dba');

class m240521_165915_create_domain_table extends Migration {

  table = 'domain';

  async up(){
    await this.createTable(this.table, {
      name: this.string().notNull(),
      description: this.string().null(),
      status: this.tinyInteger(3).defaultValue(0),
      ssl: this.tinyInteger(3).defaultValue(0),
      dns: this.tinyInteger(3).defaultValue(0),
      created_at: this.timestamp().defaultExpression(this.currentTimestamp()),
      updated_at: this.timestamp().defaultExpression(this.currentTimestamp()).onUpdate(this.currentTimestamp()),
      expires_ssl_at: this.timestamp().null(),
      expires_domain_at: this.timestamp().null(),
      last_dns_check_at: this.timestamp().null(),
      last_ssl_check_at: this.timestamp().null(),
    });
    return true;
  }

  async down(){
    await this.dropTable(this.table);
    return true;
  }
}
module.exports = m240521_165915_create_domain_table
