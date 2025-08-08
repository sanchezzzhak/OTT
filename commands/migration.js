const { DBA, MigrationManager } = require('node-dba');
const { resolve } = require('node:path');
const { Argument } = require('commander');

const rootApp = __dirname + '/../';

const configDir = resolve(rootApp, 'configs/db');
const migrationDir = resolve(rootApp, 'migrations');

DBA.loadConfigsForDir(configDir);

const
  name = 'migrate',
  dbNames = Object.keys(DBA.getConfigs()),
  version = '1.0.0',
  description = 'migration tools',
  opts = [],
  args = [
    new Argument('<db>', 'config db name').choices(dbNames),
    new Argument('[command]', 'command name')
      .default(MigrationManager.COMMAND_UP)
      .choices([
        MigrationManager.COMMAND_UP,
        MigrationManager.COMMAND_DOWN,
        MigrationManager.COMMAND_CREATE
      ]),
    new Argument('[limit]', 'limit apply migration').default(null),
    new Argument('[name]', 'name migration').default(null)
  ];

const action = async function(db, command, limit, name) {
  const migrationManager = new MigrationManager({
    db: DBA.instance(db, {applicationName: 'ott-dba-migration' }),
    migrations: migrationDir,
    migrationsTableName: 'migration'
  });
  const isInit = await migrationManager.initMigrationHistory();
  if (!isInit) {
    return false;
  }
  switch (command) {
    case MigrationManager.COMMAND_UP:
      await migrationManager.runCommandUp(limit ?? 0);
      break;
    case MigrationManager.COMMAND_DOWN:
      await migrationManager.runCommandDown(limit ?? 1);
      break;
    case MigrationManager.COMMAND_CREATE:
      await migrationManager.runCommandCreate(name);
      break;
  }
  process.exit(0);
};

module.exports = {
  action, name, description, version, opts, args
};