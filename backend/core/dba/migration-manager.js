const Base = require('./base');
const fs = require('node:fs');
const path = require('node:path');
const Query = require('./query');
const OrderSort = require('./order-sort');
const helper = require('./helper');
const color = require('ansi-colors');
const {argv} = require('node:process');
const prompts = require('prompts');
const {SingleBar} = require('cli-progress');

const CONFIRM_ENUMS = ['y', 'yes', 'n', 'no'];
const CONFIRM_ENUM_YES = ['y', 'yes'];
const CONFIRM_ENUM_NO = ['n', 'no'];

class MigrationManager extends Base {

  /*** @type {PgConnection|ClickHouseConnection} db */
  db;
  /*** @type {string} migrations */
  migrations;
  /*** @type {string} migrationsTableName */
  migrationsTableName = 'migration';

  constructor(options = {}) {
    super();
    this.setOwnProperties(options);
  }

  async initMigrationHistory() {
    let migrationHistory = await this.db.getTableSchema(
        this.migrationsTableName, true);

    if (helper.empty(migrationHistory)) {
      try {
        console.log(color.yellow(`Init migration history`));
        console.log(color.yellow(
            `Creating migration history table "${this.migrationsTableName}"`),
        );

        await this.db.createCommand().createTable(this.migrationsTableName, {
          version: 'varchar(180) NOT NULL PRIMARY KEY',
          apply_time: 'integer',
        });
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }

  async getMigrationHistory(limit = null) {
    const query = (new Query()).
    select(['version', 'apply_time']).
    from(this.migrationsTableName).
    orderBy({
      apply_time: OrderSort.DESC,
      version: OrderSort.DESC,
    });
    if (limit) {
      query.limit(limit);
    }
    return await query.map(this.db, 'version', 'apply_time');
  }

  async createMigrationHistory(version) {
    return await this.db.createCommand().insert(this.migrationsTableName, {
      version: version,
      apply_time: ((1 * new Date()) / 1000).toFixed(0),
    });
  }

  async deleteMigrationHistory(version) {
    return await this.db.createCommand().delete(this.migrationsTableName, {
      version: version,
    });
  }

  static COMMAND_UP = 'up';
  static COMMAND_DOWN = 'down';
  static COMMAND_CREATE = 'create';

  /**
   * main method
   *
   * @returns {Promise<boolean>}
   */
  async run() {
    const isInit = await this.initMigrationHistory();
    if (!isInit) {
      return false;
    }
    switch (argv[2] ?? MigrationManager.COMMAND_UP) {
      case MigrationManager.COMMAND_UP:
        await this.runCommandUp(parseInt(argv[3] ?? 0));
        break;
      case MigrationManager.COMMAND_DOWN:
        await this.runCommandDown(argv[3] ?? 1);
        break;
      case MigrationManager.COMMAND_CREATE:
        await this.runCommandCreate(argv[3] ?? null);
        break;
    }
  }

  /**
   * Apply up or Revert down migrations for array
   *
   * @param {[]} migrations - migrations array
   * @param {string} command - up or down command
   * @returns {Promise<boolean>}
   */
  async processMigration(migrations, command) {
    const progress = new SingleBar({
      format: 'progress |' + color.cyan('{bar}') +
          '| {percentage}% || {value}/{total} Chunks',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    });
    let start = (new Date()).getTime();
    let time;
    let logs = [];
    progress.start(migrations.length, 0);
    for (let i = 0, l = migrations.length; i < l; i++) {
      let result = await (async () => {
        const name = migrations[i];
        const file = `${this.migrations}/${name}.js`;
        const migrate = new (require(file))({
          db: this.db,
        });

        if (command === MigrationManager.COMMAND_UP) {
          logs.push(color.yellow('*** applying ' + name));
        } else {
          logs.push(color.yellow('*** reverting ' + name));
        }
        let isSuccess = command === MigrationManager.COMMAND_UP
            ? await migrate.up()
            : await migrate.down();

        time = new Date().getTime() - start;

        if (isSuccess) {
          if (command === MigrationManager.COMMAND_UP) {
            await this.createMigrationHistory(name);
            logs.push(
                color.green(
                    `*** applied ${name} (time: ${(time / 1000)}s)\n`));
          } else {
            await this.deleteMigrationHistory(name);
            logs.push(
                color.green(
                    `*** reverted ${name} (time: ${(time / 1000)}s)\n`));
          }
          return true;
        }

        logs.push(command === MigrationManager.COMMAND_UP
            ? color.red(
                `*** failed to apply ${name} (time: ${(time / 1000)}s)\n`)
            : color.red(
                `*** failed to revert ${name} (time: ${(time / 1000)}s)\n`),
        );

        return false;
      })();
      // print logs and stop progress bar
      if (!result) {
        progress.stop();
        console.log(logs.join('\n'));
        return false;
      }
      progress.increment();
    }
    progress.stop();

    console.log(logs.join('\n'));
    if (command === MigrationManager.COMMAND_UP) {
      console.log(color.green('Migrated up successfully'));
    } else {
      console.log(color.green('Migrated down successfully'));
    }
    return true;
  }

  /**
   * Up migrations command
   *
   * @param limit
   * @returns {Promise<boolean>}
   */
  async runCommandUp(limit) {
    let history = await this.getMigrationHistory(null);
    let migrations = [];
    fs.readdirSync(this.migrations, {
      withFileTypes: true,
    }).filter((file => /\.(js)$/.test(file.name))).forEach((file => {
      let fileName = file.name;
      let name = path.parse(fileName).name;

      if (!history[name]) {
        migrations.push(name);
      }
    }));

    if (migrations.length === 0) {
      console.log(
          color.green(`No new migration found. Your system is up-to-date`));
      return true;
    }

    migrations.sort();
    if (limit > 0) {
      migrations = migrations.splice(0, limit);
    }
    console.log(color.yellow(`Total migrations to be applied:`));
    migrations.forEach((migration => {
      console.log(color.yellow(`  ${migration}`));
    }));

    let answer = await prompts([
      {
        type: 'text',
        name: 'value',
        message: `Apply the above migrations (${CONFIRM_ENUMS.join(',')})?`,
        validate: value => CONFIRM_ENUMS.includes(value.toLowerCase()),
      },
    ]);

    if (CONFIRM_ENUM_YES.includes(answer.value)) {
      return await this.processMigration(migrations,
          MigrationManager.COMMAND_UP);
    }

    if (CONFIRM_ENUM_NO.includes(answer.value)) {
      console.log(color.red('Operations are canceled.'));
      return true;
    }
  }

  generateNameForVersion(version) {
    let date = new Date();
    let prefix = date.getFullYear().toString(10).substring(2)
        + (date.getMonth() + 1).toString(10).padStart(2, '0')
        + date.getDate().toString(10).padStart(2, '0')
        + '_'
        + date.getHours().toString(10).padStart(2, '0')
        + date.getMinutes().toString(10).padStart(2, '0')
        + date.getSeconds().toString(10).padStart(2, '0');
    let name = helper.words(version).map(_ => _.toLowerCase()).join('_');
    return `m${prefix}_${name}`;
  }

  /**
   * Create migration blank
   *
   * @param version
   * @returns {Promise<boolean>}
   */
  async runCommandCreate(version) {
    let regex = /^[\w_ ]{1,220}$/;

    const validate = (version) => {
      return version && regex.test(version) && version && version.length < 220;
    };

    if (!version) {
      let answer = await prompts([
        {
          type: 'text',
          name: 'value',
          message: `Set migration name(${regex.toString()})?`,
          validate: value => validate(value),
        },
      ]);
      version = answer.value;
    }

    if (!validate(version)) {
      console.log(color.red(
          'The migration name should contain letters, digits, underscore characters only. ([\\w_ ]{1,220})'));
      return false;
    }

    const prefixVersion = this.generateNameForVersion(version);
    const file = `${this.migrations}/${prefixVersion}.js`;

    let answer = await prompts([
      {
        type: 'text',
        name: 'value',
        message: `Create new migration "${file}" (${CONFIRM_ENUMS.join(',')})?`,
        validate: value => CONFIRM_ENUMS.includes(value.toLowerCase()),
      },
    ]);
    if (CONFIRM_ENUM_YES.includes(answer.value)) {

      const code = `
const {Migration} = require('node-dba');

class ${prefixVersion} extends Migration {
  async up(){
    return true;
  }

  async down(){
    return true;
  }
}
module.exports = ${prefixVersion}
`;
      try {
        fs.writeFileSync(file, code);
        console.log(color.green('New migration created successfully'));
        return true;
      } catch (e) {
        console.log(color.red('Failed to create new migration'));
        console.error(e);
      }
      return false;
    }
    if (CONFIRM_ENUM_NO.includes(answer.value)) {
      console.log(color.red('Operations are canceled.'));
      return true;
    }
  }

  /**
   * Down migrations command
   *
   * @param limit
   * @returns {Promise<boolean>}
   */
  async runCommandDown(limit = 1) {
    if (limit === 'all') {
      limit = null;
    } else {
      limit = parseInt(limit);
      if (limit < 1) {
        console.log(color.red('The limit must be greater than 0.'));
        return false;
      }
    }

    const history = await this.getMigrationHistory(limit);
    if (helper.empty(history)) {
      console.log(color.yellow('No migration has been done before.'));
      return false;
    }
    let migrations = Object.keys(history);
    if (limit > 0) {
      migrations = migrations.splice(0, limit);
    }
    console.log(color.yellow(`Total migrations to be revered:`));
    migrations.forEach((migration => {
      console.log(color.yellow(`  ${migration}`));
    }));

    let answer = await prompts([
      {
        type: 'text',
        name: 'value',
        message: `Revert the above migrations (${CONFIRM_ENUMS.join(',')})?`,
        validate: value => CONFIRM_ENUMS.includes(value.toLowerCase()),
      },
    ]);

    if (CONFIRM_ENUM_YES.includes(answer.value)) {
      return await this.processMigration(migrations,
          MigrationManager.COMMAND_DOWN);
    }

    if (CONFIRM_ENUM_NO.includes(answer.value)) {
      console.log(color.red('Operations are canceled.'));
      return true;
    }
  }

}

module.exports = MigrationManager;