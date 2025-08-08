const { Migration } = require('node-dba');

class m250808_193841_create_monitor_span_table extends Migration {

  table = 'monitor_span';

  async up() {
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      transaction_id: this.uuid().notNull(),
      span_id: this.text().notNull(),
      parent_span_id: this.text().notNull(),
      on: this.text(),
      description: this.text(),
      start_timestamp: 'TIMESTAMPTZ NOT NULL',
      end_timestamp: 'TIMESTAMPTZ NOT NULL',
      duration_ms: 'DOUBLE PRECISION GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_timestamp - start_timestamp)) * 1000) STORED',
    });

    /*
    INDEX ON (transaction_id),
    INDEX ON (op)
     */
    return true;
  }


  async down() {
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m250808_193841_create_monitor_span_table;
