### Documentation
🔙 [back to main page](/readme.md)
* [Where](/docs/en/where.md) +
* [Order By](/docs/en/orderby.md) +
* [Group By](/docs/en/groupby.md) +
* [Having](/docs/en/having.md) +

* [Migration](/docs/en/migration.md)
* [CRUD](/docs/en/crud.md)
-----

#### Config Supports json or js files
* js
```js
// recommendations use package https://www.npmjs.com/package/dotenv

const PostgressConfig = {
  driver: 'pg',
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  connectionOptions: {},
}
module.exports = PostgressConfig;
```
save the config to any folder for example `config/local/db/pg.js`

#### Base usage

```js
const {DBA} = require('node-dba');
// init all configs for dir
DBA.loadConfigsForDir(__dirname + '/config/local/db');
// ...
// get db connect
const db = DBA.instance('pg');
```

#### Query Builder
```js
const {DBA, Query} = require('node-dba');
const db = DBA.instance('pg');
const query = new Query();
const result = await query.select(['id', 'name'])
.from('users')
.all(db)
```

