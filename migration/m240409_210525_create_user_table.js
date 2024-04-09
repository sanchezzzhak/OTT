
const {Migration} = require('node-dba');

class m240409_210525_create_user_table extends Migration {

  table = 'user'

  async up(){

    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      email: this.string().notNull(),
      role: this.string(),
      salt: this.string(),
      password_hash: this.string(),
      status: this.integer(),
      created_at: this.timestamp(),
      updated_at: this.timestamp(),
      last_seen_at: this.timestamp(),
      telegram_id: this.string(),
      pin_auth: this.integer(),
      pin_code: this.string(10),
    });

    await this.createIndexConvention(this.table, ['status']);
    await this.createIndexConvention(this.table, ['telegram_id']);
    await this.createIndexConvention(this.table, ['last_seen_at']);
    await this.createIndexConvention(this.table, ['created_at']);
    await this.createIndexConvention(this.table, ['email'], true);

    return true;
  }

  async down(){
    return true;
  }
}
module.exports = m240409_210525_create_user_table
