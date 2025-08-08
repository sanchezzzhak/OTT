const { Migration } = require('node-dba');

class m250808_193841_create_monitor_transaction_table extends Migration {

  table = 'monitor_transaction';

  async up() {
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      event_id: this.uuid().notNull(),
      name: this.string().notNull(),
      on: this.text().null(),
      description: this.text().null(),
      start_timestamp: 'TIMESTAMPTZ NOT NULL',
      end_timestamp: 'TIMESTAMPTZ NOT NULL',
      duration_ms: 'DOUBLE PRECISION GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_timestamp - start_timestamp)) * 1000) STORED',
    });

    return true;
  }


  async down() {
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m250808_193841_create_monitor_transaction_table;
