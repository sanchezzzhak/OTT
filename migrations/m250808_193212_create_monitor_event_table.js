
const {Migration} = require('node-dba');

class m250808_193212_create_monitor_event_table extends Migration {

  table = 'monitor_event'

  async up(){

    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      project_id: this.uuid().notNull(),
      event_id: this.string().notNull(),
      event_type_id: this.integer().null(),
      release_id: this.uuid().null(),
      environment: this.string().null(),
      message: this.text().null(),
      level: this.string().null(),
      platform: this.string().null(),
      sdk_name: this.string().null(),
      sdk_version: this.string().null(),
      culprit: this.string().null(),
      server_name: this.string().null(),
      timestamp: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()',
      received_at: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()',
      fingerprint: this.string().null(),
      issue_id: this.uuid().null(),

    });

    /*
        INDEX ON (project_id, timestamp DESC),
    INDEX ON (issue_id),
    INDEX ON (fingerprint),
    UNIQUE (project_id, event_id)
     */

    return true;
  }

  async down(){
    await this.dropTable(this.table)
    return true;
  }
}
module.exports = m250808_193212_create_monitor_event_table
