
const {Migration} = require('node-dba');

class m240409_210525_create_user_table extends Migration {

  table = 'user'

  async up(){

    const columns = {
      id: this.primaryUUIDKey(),
      email: this.string().notNull(),
      role: this.string(),
      salt: this.string(),
      password_hash: this.string(),
      status: this.integer(),
      telegram_id: this.string(),
      pin_auth: this.integer(),
      pin_code: this.string(10),
      created_at: this.timestamp().defaultExpression(this.currentTimestamp()),
      updated_at: this.timestamp().defaultExpression(this.currentTimestamp())
        .onUpdate(this.currentTimestamp()),
      last_seen_at: this.timestamp(),
    };

    await this.createTable(this.table, columns);

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
