const { Migration } = require('node-dba');

class m250808_193841_create_monitor_stack_frame_table extends Migration {

  table = 'monitor_stack_frame';

  async up() {
    await this.createTable(this.table, {
      id: this.primaryUUIDKey(),
      exception_id: this.uuid().notNull(),
      filename: this.string().notNull(),
      lineno: this.integer().null(),
      colno: this.integer().null(),
      function: this.text().null(),
      class: this.text().null(),
      type: this.string().null(),
      context_line: this.text().null(),
      pre_context: 'TEXT[]',
      post_context: 'TEXT[]',
      in_app: this.boolean().defaultExpression('false')
    });
    /*
    INDEX ON (exception_id) */
    return true;

  }


  async down() {
    await this.dropTable(this.table);
    return true;
  }
}

module.exports = m250808_193841_create_monitor_stack_frame_table;
