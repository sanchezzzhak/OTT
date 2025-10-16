const { Migration } = require('node-dba');

class m250808_193841_create_monitor_profile_table extends Migration {

  table = 'monitor_profile';

  async up() {
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      event_id: this.uuid().notNull(),
      format: this.string().notNull(),
      data: 'JSONB NOT NULL',
      duration_ms: this.double().precision(),
      sample_rate: this.double().precision(),
      created_at: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()',
    });

    /*
     INDEX ON (event_id)
     */
    return true;
  }


  async down() {
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m250808_193841_create_monitor_profile_table;
