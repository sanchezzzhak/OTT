const BaseQueryBuilder = require('../query-builder');
const LikeCondition = require('../conditions/like-condition');
const SchemaTypes = require('./../consts/schema-types');

class QueryBuilder extends BaseQueryBuilder {

  constructor(db) {
    super(db);
    this.conditionMap = {
      ...{
        'ILIKE': LikeCondition,
        'NOT ILIKE': LikeCondition,
        'OR ILIKE': LikeCondition,
        'OR NOT ILIKE': LikeCondition,
      }, ...this.conditionMap,
    };
    this.initTypeMap();
  }

  initTypeMap() {
    this.typeMap = {};
    this.typeMap[SchemaTypes.TYPE_PK] = 'serial NOT NULL PRIMARY KEY';
    this.typeMap[SchemaTypes.TYPE_UPK] = 'serial NOT NULL PRIMARY KEY';
    this.typeMap[SchemaTypes.TYPE_BIGPK] = 'bigserial NOT NULL PRIMARY KEY';
    this.typeMap[SchemaTypes.TYPE_UBIGPK] = 'bigserial NOT NULL PRIMARY KEY';
    this.typeMap[SchemaTypes.TYPE_CHAR] = 'char(1)';
    this.typeMap[SchemaTypes.TYPE_STRING] = 'varchar(255)';
    this.typeMap[SchemaTypes.TYPE_TEXT] = 'text';
    this.typeMap[SchemaTypes.TYPE_TINYINT] = 'smallint';
    this.typeMap[SchemaTypes.TYPE_SMALLINT] = 'smallint';
    this.typeMap[SchemaTypes.TYPE_INTEGER] = 'integer';
    this.typeMap[SchemaTypes.TYPE_BIGINT] = 'bigint';
    this.typeMap[SchemaTypes.TYPE_FLOAT] = 'double precision';
    this.typeMap[SchemaTypes.TYPE_DOUBLE] = 'double precision';
    this.typeMap[SchemaTypes.TYPE_DECIMAL] = 'numeric(10,0)';
    this.typeMap[SchemaTypes.TYPE_DATETIME] = 'timestamp(0)';
    this.typeMap[SchemaTypes.TYPE_TIMESTAMP] = 'timestamp(0)';
    this.typeMap[SchemaTypes.TYPE_TIME] = 'time(0)';
    this.typeMap[SchemaTypes.TYPE_DATE] = 'date';
    this.typeMap[SchemaTypes.TYPE_BINARY] = 'bytea';
    this.typeMap[SchemaTypes.TYPE_BOOLEAN] = 'boolean';
    this.typeMap[SchemaTypes.TYPE_MONEY] = 'numeric(19,4)';
    this.typeMap[SchemaTypes.TYPE_JSON] = 'jsonb';
  }

}

module.exports = QueryBuilder;