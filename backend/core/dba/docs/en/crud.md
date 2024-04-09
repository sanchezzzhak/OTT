### CRUD

Create `bin/dba-crud.js` file locally and implement the following code.

```js
const {DBA, CrudManager} = require('node-dba');
DBA.loadConfigsForDir(__dirname + '/config/local/db');
const crudManager = new CrudManager({
  // path where to save new models
  models: __dirname + '/models',
});

crudManager.run();
```

The following commands will be available to you.
* create active record model `node bin/dba-crud.js create-model <table name>`
* create active query `node bin/dba-crud.js create-query <table name>`
