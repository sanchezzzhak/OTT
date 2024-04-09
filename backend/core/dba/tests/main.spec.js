const {should, assert, expect} = require('chai');
const {DBA, Query, Expression} = require('../index');
const CarRotate = require('./models/car-rotate');
DBA.loadConfigsForDir(__dirname + '/config/db');

const TIMEOUT = 20000;
const PG = 'pg';

/**
 *
 * @param {string} expectSql
 * @param {string} equalSql
 * @returns {void|*}
 */
const expectSql = (expectSql, equalSql) => {
  return expect(expectSql.replace(/\s+/g, ' '),)
	.to.equal(equalSql.replace(/\s+/g, ' '));
};

describe('active records', function () {
  this.timeout(TIMEOUT);
  it('test tableName', async function () {
	expect(CarRotate.tableName()).to.equal('car_rotate');
  });

  it('test getDb', async function () {
	let db = DBA.instance(PG);
	CarRotate.getDb();
	expect(CarRotate.getDb()).to.equal(db);
  });
});

describe('tests connections', function () {
  this.timeout(TIMEOUT);
  it('postgress test connection', async function () {
	let db = DBA.instance(PG);
	await db.connect();
	await db.disconnect();
	return Promise.resolve();
  });

  it('test impl pg driverName', async function () {
	let db = DBA.instance(PG);
	expect(db.constructor.getDriverName).to.equal('pg');
  });

});

describe('tests queries', function () {
  this.timeout(TIMEOUT);

  describe('select', function () {
	it('test base query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query({db});
	  expect(query.db).to.equal(db);

	  query.select(['column1', 'column2']).from('customer');
	  expect(db.constructor.getDriverName).to.equal('pg');

	  let sql = query.createCommand().getRawSql();
	  expect('SELECT "column1", "column2" FROM "customer"').to.equal(sql);
	});

	it('test select * for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');

	  expect({'*': '*'}).to.deep.equal(query.getSelect());
	  expect(false).to.equal(query.getDistinct());
	  expect('').to.equal(query.getSelectOption());
	  expectSql(`SELECT *`, query.createCommand(db).getRawSql());
	});

	it('test select distinct for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query({db});

	  query.select('id, name', 'something').distinct(true);

	  expect({'id': 'id', 'name': 'name'}).to.deep.equal(query.getSelect());
	  expect(true).to.equal(query.getDistinct());
	  expect('something').to.equal(query.getSelectOption());
	  expectSql(`SELECT DISTINCT something "id", "name"`, query.createCommand().getRawSql());
	});

	it('test addSelect for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query({db});
	  query.addSelect('email');

	  expect({'email': 'email'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT "email"`, query.createCommand().getRawSql());

	  query = new Query({db});
	  query.addSelect(['*', 'abc']);
	  query.addSelect(['*', 'bca']);

	  expect({'*': '*', 'abc': 'abc', 'bca': 'bca'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT *, "abc", "bca"`, query.createCommand().getRawSql());
	});

	it('test select + addSelect for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query({db});
	  query.select('id, name');
	  query.addSelect('email');

	  expect({'id': 'id', 'name': 'name', 'email': 'email'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT "id", "name", "email"`, query.createCommand().getRawSql());
	});

	it('test select alias for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.addSelect(['field1 as a', 'field 1 as b']);

	  expect({'a': 'field1', 'b': 'field 1'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT "field1" AS "a", "field 1" AS "b"`, query.createCommand(db).getRawSql());

	  query = new Query();
	  query.addSelect(['field1 a', 'field 1 b']);

	  expect({'a': 'field1', 'b': 'field 1'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT "field1" AS "a", "field 1" AS "b"`, query.createCommand(db).getRawSql());

	  query = new Query();
	  query.select('name,name, name as X, name as X');

	  expect({'name': 'name', 'X': 'name'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT "name", "name" AS "X"`, query.createCommand(db).getRawSql());

	  query = (new Query()).select('id');

	  expect({'id': 'id'}).to.deep.equal(query.getSelect());

	  query.select(['id', 'brand_id']);

	  expect({'id': 'id', 'brand_id': 'brand_id'}).to.deep.equal(query.getSelect());
	  expectSql(`SELECT "id", "brand_id"`, query.createCommand(db).getRawSql());
	});

	it('test select function for Query', function () {
	  let db = DBA.instance(PG);
	  let query = (new Query()).select({
		'prefix': 'LEFT(name, 7)', 'prefix_key': 'LEFT(name, 7)',
	  });
	  query.addSelect(['LEFT(name,8) as test']);

	  expect({
		'prefix': 'LEFT(name, 7)', 'prefix_key': 'LEFT(name, 7)', 'test': 'LEFT(name,8)',
	  }).to.deep.equal(query.getSelect());
	  expectSql(`SELECT LEFT(name, 7) AS "prefix",
     LEFT(name, 7) AS "prefix_key",
     LEFT(name,8) AS "test"`, query.createCommand(db).getRawSql());
	});
  });

  describe('from', function () {
	it('test from Expression (as is)', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  let tables = new Expression('(SELECT id, name FROM user) u');
	  query.from(tables);
	  assert.instanceOf(query.getFrom()[0], Expression);

	  expectSql(`SELECT *
               FROM (SELECT id, name FROM user) u`, query.createCommand(db).getRawSql());
	});

	it('test from alias object for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.from({u: 'users', p: 'payments'});

	  expectSql(`SELECT *
               FROM "users" "u",
                    "payments" "p"`, query.createCommand(db).getRawSql());
	});

	it('test table from for Map', function () {
	  let tables = new Map();
	  tables.set('u', 'user');
	  tables.set('p', 'post');

	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.from(tables);

	  expect({u: 'user', p: 'post'}).to.deep.equal(query.getFrom());
	  expectSql(`SELECT *
               FROM "user" "u",
                    "post" "p"`, query.createCommand(db).getRawSql());
	});

	it('test from for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.from('user');

	  expect(['user']).to.deep.equal(query.getFrom());
	  expectSql('SELECT * FROM "user"', query.createCommand(db).getRawSql());

	  query = new Query();
	  query.from('user as u');

	  expect(['user as u']).to.deep.equal(query.getFrom());
	  expectSql(`SELECT *
               FROM "user" AS "u"`, query.createCommand(db).getRawSql());
	});
  });

  describe('where', function () {
	it('test where for Query', function () {
	  let query = new Query();
	  query.where('id = :id', {':id': 1});

	  expect({':id': 1}).to.deep.equal(query.getParams());
	  expect('id = :id').equal(query.getWhere());

	  query.andWhere('name = :name', {':name': 'something'});

	  expect({':id': 1, ':name': 'something'}).to.deep.equal(query.getParams());
	  expect(['and', 'id = :id', 'name = :name']).to.deep.equal(query.getWhere());

	  query.orWhere('age = :age', {':age': '33'});

	  expect({':id': 1, ':name': 'something', ':age': '33'}).to.deep.equal(query.getParams());
	  expect(['or', ['and', 'id = :id', 'name = :name'], 'age = :age']).to.deep.equal(query.getWhere());

	  query.from(['profiles']);
	  let db = DBA.instance(PG);

	  expectSql(`SELECT *
               FROM "profiles"
               WHERE ((id = 1) AND (name = 'something'))
                  OR (age = 33)`, query.createCommand(db).getRawSql(),);
	});

	it('test filter where hash for Query', function () {
	  let query = new Query();
	  let condition = {id: 0};
	  query.filterWhere({
		'id': 0, 'title': '   ', 'author_ids': [],
	  });

	  expect(condition).to.deep.equal(query.getWhere());

	  query.andFilterWhere({'status': null});

	  expect(condition).to.deep.equal(query.getWhere());

	  query.orFilterWhere({'name': '', hello: void 0});

	  expect(condition).to.deep.equal(query.getWhere());
	});
  });

  describe('filter where', function () {
	const db = DBA.instance(PG);

	it('filterWhere (simple like condition)', function () {
	  const query = new Query();
	  query.from('user');
	  query.filterWhere(['like', 'name', 'Odyssey']);

	  expectSql(`SELECT *
                 FROM "user"
                 WHERE "name" LIKE 'Odyssey'`, query.createCommand(db).getRawSql(),);
	});

	it('andFilterWhere (simple condition, between condition)', function () {
	  const query = new Query();
	  query.from('user');
	  query.filterWhere(['like', 'name', 'Odyssey']);
	  query.andFilterWhere(['between', 'id', 10, 20]);

	  expectSql(`SELECT *
                 FROM "user"
                 WHERE ("name" LIKE 'Odyssey')
                   AND ("id" BETWEEN 10 AND 20)`, query.createCommand(db).getRawSql(),);
	});

	it('orFilterWhere (simple condition, not between condition)', function () {
	  const query = new Query();
	  query.from('user');
	  query.filterWhere(['like', 'name', 'Odyssey']);
	  query.orFilterWhere(['not between', 'id', 10, 20]);

	  expectSql(`SELECT *
                 FROM "user"
                 WHERE ("name" LIKE 'Odyssey')
                    OR ("id" NOT BETWEEN 10 AND 20)`, query.createCommand(db).getRawSql(),);
	});

	it('all combinations filterWhere where orFilterWhere', function () {
	  const query = new Query();
	  query.from('user');
	  query.filterWhere(['like', 'name', 'Odyssey']);
	  query.orFilterWhere(['not between', 'id', 10, 20]);
	  query.orFilterWhere(['not between', 'id', null, null]);
	  query.andFilterWhere(['in', 'id', []]);
	  query.andFilterWhere(['not in', 'id', []]);
	  query.andFilterWhere(['like', 'id', '']);
	  query.andFilterWhere(['or', ['in', 'id', 500], ['in', 'id', [50, 301]]]);
	  query.andFilterWhere(['not like', 'id', '   ']);
	  query.andFilterWhere(['or not like', 'id', null]);
	  query.andFilterWhere(['or', ['eq', 'id', null], ['eq', 'id', []]]);

	  expectSql(`SELECT *
                 FROM "user"
                 WHERE (("name" LIKE 'Odyssey') OR ("id" NOT BETWEEN 10 AND 20))
                   AND ((0=1) OR ("id" IN (50, 301)))`, query.createCommand(db).getRawSql(),);
	});

	it('filter where recursively', function () {
	  const query = new Query();
	  query.from('user');
	  query.filterWhere(['and', ['like', 'name', ''], ['like', 'title', ''], {id: 1}, ['not like', 'title', ''],]);

	  expectSql(`SELECT *
                 FROM "user"
                 WHERE "id" = 1`, query.createCommand(db).getRawSql(),);
	});

  });

  describe('having', function () {

	it('test having', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users');
	  query.having('id = :id', {':id': 1});
	  query.andHaving('name = :name', {':name': 'something'});
	  query.orHaving('age = :age', {':age': '30'});

	  expectSql(`SELECT *
               FROM "users"
               HAVING ((id = 1) AND (name = 'something'))
                   OR (age = 30)`, query.createCommand(db).getRawSql(),);
	});

	it('test filter having hash for Query', function () {
	  const db = DBA.instance(PG);
	  let query = new Query();
	  let condition = {id: 10};
	  query.from('user');
	  query.filterHaving({
		'id': 10, 'title': '   ', 'author_ids': [],
	  });

	  expect(condition).to.deep.equal(query.getHaving());

	  query.andFilterHaving({'status': null});

	  expect(condition).to.deep.equal(query.getHaving());

	  query.orFilterHaving({'name': ''});

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(`SELECT *
               FROM "user"
               HAVING "id" = 10`, query.createCommand(db).getRawSql(),);
	});

	it('test filter having for Query', function () {
	  const db = DBA.instance(PG);
	  let query = new Query();
	  query.from('user');

	  let condition = {'id': 0};
	  query.filterHaving(condition);
	  expect(condition).to.deep.equal(query.getHaving());

	  let sqlCheck = `SELECT *
                    FROM "user"
                    HAVING "id" = 0`;

	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['between', 'id', null, null]);

	  expect(condition).to.deep.equal(query.getHaving());

	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.orFilterHaving(['not between', 'id', null, null]);

	  expect(condition).to.deep.equal(query.getHaving());

	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['in', 'id', []]);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['not in', 'id', []]);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['like', 'id', '']);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['or like', 'id', '']);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['not like', 'id', '   ']);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['or not like', 'id', null]);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);

	  query.andFilterHaving(['or', ['eq', 'id', null], ['eq', 'id', []]]);

	  expect(condition).to.deep.equal(query.getHaving());
	  expectSql(sqlCheck, query.createCommand(db).getRawSql(),);
	});
  });

  describe('group by', function () {
	it('test group for Query', function () {
	  let query = new Query();
	  query.select('*').from('users');
	  query.groupBy('team');

	  expect(['team']).to.deep.equal(query.getGroupBy());

	  query.addGroupBy(['company']);

	  expect(['team', 'company']).to.deep.equal(query.getGroupBy());

	  query.addGroupBy('age');

	  expect(['team', 'company', 'age']).to.deep.equal(query.getGroupBy());

	  let db = DBA.instance(PG);
	  let sql = query.createCommand(db).getRawSql();

	  expectSql(`SELECT *
               FROM "users"
               GROUP BY "team", "company", "age"`, sql);
	});
  });

  describe('order by', function (){
	it('test order by Expression for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users');

	  let expression1 = new Expression('SUBSTR(name, 3, 4) DESC, x ASC');
	  query.orderBy(expression1);

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY SUBSTR(name, 3, 4) DESC, x ASC`, query.createCommand(db).getRawSql(),);

	  let expression2 = new Expression('SUBSTR(name, 893, 4) DESC');
	  query.addOrderBy(expression2);

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY SUBSTR(name, 3, 4) DESC, x ASC, SUBSTR(name, 893, 4) DESC`, query.createCommand(db).getRawSql(),);
	});

	it('test order by for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users');
	  query.orderBy('team');

	  let sql = query.createCommand(db).getRawSql();

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY "team" ASC`, sql);

	  query.addOrderBy('company');
	  sql = query.createCommand(db).getRawSql();

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY "team" ASC, "company" ASC`, sql);

	  query.addOrderBy('age');
	  sql = query.createCommand(db).getRawSql();

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY "team" ASC, "company" ASC, "age" ASC`, sql);

	  query.addOrderBy({'age': 'DESC'});
	  sql = query.createCommand(db).getRawSql();

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY "team" ASC, "company" ASC, "age" DESC`, sql);

	  query.addOrderBy('age ASC, company DESC');
	  sql = query.createCommand(db).getRawSql();

	  expectSql(`SELECT *
               FROM "users"
               ORDER BY "team" ASC, "company" DESC, "age" ASC`, sql);
	});
  });

  describe('join', function (){
	it('test join for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users as u');
	  query.join('paymens as p', 'u.id = p.user_id')
	  query.where({status: 1})

	  expectSql(`SELECT *
               FROM "users" AS "u"
                        JOIN "paymens" AS "p" ON u.id = p.user_id
               WHERE "status" = 1`, query.createCommand(db).getRawSql(),);
	})

	it('test left join for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users as u');
	  query.leftJoin('paymens as p', 'u.id = p.user_id')
	  query.where({status: 1})

	  expectSql(`SELECT *
               FROM "users" AS "u"
                        LEFT JOIN "paymens" AS "p" ON u.id = p.user_id
               WHERE "status" = 1`, query.createCommand(db).getRawSql(),);
	})

	it('test inner join for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users as u');
	  query.innerJoin('paymens as p', 'u.id = p.user_id AND p.status = :status', {
		':status': 3,
	  });
	  query.where({status: 1})

	  expectSql(`SELECT *
               FROM "users" AS "u"
                        INNER JOIN "paymens" AS "p" ON u.id = p.user_id AND p.status = 3
               WHERE "status" = 1`,
		query.createCommand(db).getRawSql(),);
	})

	it('test right join for Query', function () {
	  let db = DBA.instance(PG);
	  let query = new Query();
	  query.select('*');
	  query.from('users as u');
	  query.rightJoin('paymens as p', 'u.id = p.user_id')
	  query.where({status: 1})

	  expectSql(`SELECT *
               FROM "users" AS "u"
                        RIGHT JOIN "paymens" AS "p" ON u.id = p.user_id
               WHERE "status" = 1`, query.createCommand(db).getRawSql(),);
	})
  });

  describe('migrations', async function () {

  })

  describe('commands', async function () {
	const db = DBA.instance(PG);
	const TABLE_NAME = 'test_table';
	const command = db.createCommand();

	it('test create table', async function () {
	  await command.createTable(TABLE_NAME, {
		'name': 'varchar(255)'
	  })
	  await command.release();
	});

	it('test insert', async function () {
	  let result = await command.insert(TABLE_NAME, {
		name: 'test'
	  })
	  await command.release()
	});

	it('test drop table', async function () {
	  await command.dropTable(TABLE_NAME)
	  await command.release()
	});
  });

  this.beforeAll(() => {
	let db = DBA.instance(PG);
	db.disconnect();
  })
});