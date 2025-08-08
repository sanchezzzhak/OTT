const { Migration } = require('node-dba');

class m250808_193841_create_monitor_issue_table extends Migration {

  table = 'monitor_issue';

  async up() {
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      project_id: this.uuid().notNull(),
      fingerprint: this.string().notNull(),
      title: this.text().null(),
      status: this.text().null(),
      first_seen: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()',
      last_seen: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()',
      count: 'BIGINT NOT NULL DEFAULT 1',
      release_id: this.uuid().null(),
    });

    /*
    INDEX ON (project_id, last_seen DESC),
    UNIQUE (project_id, fingerprint)
     */

    return true;
  }


  async down() {
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m250808_193841_create_monitor_issue_table;
