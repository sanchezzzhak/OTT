const {DBA, MigrationManager} = require('../index');
DBA.loadConfigsForDir(__dirname + '/config/db/');

const FILE_DUMP = __dirname + '/dumps/pg/dump.sql';

(async () => {
  const db = DBA.instance('pg', {applicationName: 'node-dba-migration'});
  const migrationManager = new MigrationManager({
	db, migrations: __dirname + '/migrations',
  });
  console.log('current version PG: %s', (await db.createCommand('SELECT version()').execute()).rows.shift().version);
  await migrationManager.run()
  return true;
})();






