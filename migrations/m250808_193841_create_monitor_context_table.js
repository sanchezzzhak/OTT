const { Migration } = require('node-dba');

class m250808_193841_create_monitor_context_table extends Migration {

  table = 'monitor_context';

  async up() {
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      event_id: this.uuid().notNull(),
      key: this.string().notNull(),
      value: 'JSONB NOT NULL',
    });
    /*
      INDEX ON (event_id),
    UNIQUE (event_id, key)*/
    return true;

  }


  async down() {
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m250808_193841_create_monitor_context_table;
