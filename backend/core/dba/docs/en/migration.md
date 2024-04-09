### Migration

Create `bin/dba-migrate.js` file locally and implement the following code.

```js
const {DBA, MigrationManager} = require('node-dba');

DBA.loadConfigsForDir(__dirname + '/config/local/db');
const migrationManager = new MigrationManager({
  // the path where to look for migrations
  migrations: __dirname + '/migrations',
  migrationsTableName: 'migration'
});

migrationManager.run();
```

The following commands will be available to you.
* create blank migrate `node bin/dba-migrate create <name migration>`
* apply migrate `node node bin/dba-migrate up <count option>`
* revert migrate `node bin/dba-migrate down <count option>`

Example manual create migrate class
```js
const {Migration} = require('node-dba');

class UserTable extends Migration {

  async up(){
    await this.createTable('user', {
        'id' : this.primaryKey(11),
        'email': this.string().notNull(),
        'password': 'varchar(255) not null',
    });
    return true;
  }

  async down(){
    await this.dropTable('user');
    return true;
  }
}

module.exports = UserTable;
```

Migration class methods available for `up()/down()` methods
```
 await this.createTable(table:string, columns:{}, options:string)
 await this.dropTable(table:string)
 await this.renameTable(table:string, newTable:string)
 await this.truncateTable(table:string)
 await this.addColumn(table:string, column:string, type:string|this.string())
 await this.dropColumn(table:string, column:string,);
 await this.alterColumn(table:string, column:string, type:string|this.string());
 await this.renameColumn(table:string, column:string, newColumn:string); 
 await this.addPrimaryKey(name:string, table:string, columns:string|array);
 await this.dropPrimaryKey(name:string, table:string);
 await this.createIndex(name:string, table:string, columns:string|array, unique = false);
 await this.dropIndex(name:string, table:string);
 await this.addForeignKey(name:string, table:string, columns:string|array, refTable:string, refColumns:string|array, onDelete:null|string, onUpdate:null|string); 
 await this.dropForeignKey(name:string, table:string);
```