const BaseSchema = require('../schema');
const ColumnSchema = require('./column-schema');
const helper = require('./../helper');
const TableSchema = require('./../table-schema');
const Expression = require('./../expression');
const QueryBuilder = require('./query-builder');

const SERIAL_SEQUENCE_REGEX = /nextval\('"?\w+"?\.?"?\w+"?'(::regclass)?\)/;

class Schema extends BaseSchema {
  tableQuoteCharacter = '"';
  defaultSchema = 'public';

  static TYPE_JSONB = 'jsonb';

  constructor(config) {
    super(config);
    this.setOwnProperties(config);
    this.initTypeMap();
  }

  initTypeMap() {
    super.initTypeMap();
    this.typeMap = {
        'bit': Schema.TYPE_INTEGER,
        'bit varying': Schema.TYPE_INTEGER,
        'varbit': Schema.TYPE_INTEGER,

        'bool': Schema.TYPE_BOOLEAN,
        'boolean': Schema.TYPE_BOOLEAN,

        'box': Schema.TYPE_STRING,
        'circle': Schema.TYPE_STRING,
        'point': Schema.TYPE_STRING,
        'line': Schema.TYPE_STRING,
        'lseg': Schema.TYPE_STRING,
        'polygon': Schema.TYPE_STRING,
        'path': Schema.TYPE_STRING,

        'character': Schema.TYPE_CHAR,
        'char': Schema.TYPE_CHAR,
        'bpchar': Schema.TYPE_CHAR,
        'character varying': Schema.TYPE_STRING,
        'varchar': Schema.TYPE_STRING,
        'text': Schema.TYPE_TEXT,

        'bytea': Schema.TYPE_BINARY,

        'cidr': Schema.TYPE_STRING,
        'inet': Schema.TYPE_STRING,
        'macaddr': Schema.TYPE_STRING,

        'real': Schema.TYPE_FLOAT,
        'float4': Schema.TYPE_FLOAT,
        'double precision': Schema.TYPE_DOUBLE,
        'float8': Schema.TYPE_DOUBLE,
        'decimal': Schema.TYPE_DECIMAL,
        'numeric': Schema.TYPE_DECIMAL,

        'money': Schema.TYPE_MONEY,

        'smallint': Schema.TYPE_SMALLINT,
        'int2': Schema.TYPE_SMALLINT,
        'int4': Schema.TYPE_INTEGER,
        'int': Schema.TYPE_INTEGER,
        'integer': Schema.TYPE_INTEGER,
        'bigint': Schema.TYPE_BIGINT,
        'int8': Schema.TYPE_BIGINT,
        'oid': Schema.TYPE_BIGINT, // should not be used. it's pg internal!

        'smallserial': Schema.TYPE_SMALLINT,
        'serial2': Schema.TYPE_SMALLINT,
        'serial4': Schema.TYPE_INTEGER,
        'serial': Schema.TYPE_INTEGER,
        'bigserial': Schema.TYPE_BIGINT,
        'serial8': Schema.TYPE_BIGINT,
        'pg_lsn': Schema.TYPE_BIGINT,

        'date': Schema.TYPE_DATE,
        'interval': Schema.TYPE_STRING,
        'time without time zone': Schema.TYPE_TIME,
        'time': Schema.TYPE_TIME,
        'time with time zone': Schema.TYPE_TIME,
        'timetz': Schema.TYPE_TIME,
        'timestamp without time zone': Schema.TYPE_TIMESTAMP,
        'timestamp': Schema.TYPE_TIMESTAMP,
        'timestamp with time zone': Schema.TYPE_TIMESTAMP,
        'timestamptz': Schema.TYPE_TIMESTAMP,
        'abstime': Schema.TYPE_TIMESTAMP,

        'tsquery': Schema.TYPE_STRING,
        'tsvector': Schema.TYPE_STRING,
        'txid_snapshot': Schema.TYPE_STRING,

        'unknown': Schema.TYPE_STRING,

        'uuid': Schema.TYPE_STRING,
        'json': Schema.TYPE_JSON,
        'jsonb': Schema.TYPE_JSONB,
        'xml': Schema.TYPE_STRING,
    };
  }

  getQueryBuilder() {
    if (!this.builder) {
      return new QueryBuilder(this.db);
    }
    return this.builder;
  }

  async loadTableSchema(name) {
    const table = this.createTableSchema();
    this.resolveTableNames(table, name);
    if (await this.resolveTableColumns(table)) {
      await this.resolveTableConstraints(table);
      return table;
    }
    return null;
  }

  async resolveTableConstraints(table) {
    let tableName = this.db.quoteValue(table.name);
    let tableSchema = this.db.quoteValue(table.schemaName);

    let sql = `select
    ct.conname as constraint_name,
    a.attname as column_name,
    fc.relname as foreign_table_name,
    fns.nspname as foreign_table_schema,
    fa.attname as foreign_column_name
  from (select
    ct.conname,
        ct.conrelid,
        ct.confrelid,
        ct.conkey,
        ct.contype,
        ct.confkey,
    generate_subscripts(ct.conkey,1) as s
    from
    pg_constraint ct
  ) as ct
    inner join pg_class c on c.oid = ct.conrelid
    inner join pg_namespace ns on c.relnamespace = ns.oid
    inner join pg_attribute a on a.attrelid = ct.conrelid and a.attnum = ct.conkey[ct.s]
    left join pg_class fc on fc.oid = ct.confrelid
    left join pg_namespace fns on fc.relnamespace = fns.oid
    left join pg_attribute fa on fa.attrelid = ct.confrelid and fa.attnum = ct.confkey[ct.s]
  where
    ct.contype = 'f'
    and c.relname=${tableName}
    and ns.nspname=${tableSchema}
  order by
    fns.nspname, fc.relname, a.attnum`;

    let constraints = {};
    let queryResult = await this.db.createCommand(sql).queryAll();
    if (helper.empty(queryResult.rows)) {
      return false;
    }

    for (let i = 0, l = queryResult.rows.length; i < l; i++) {
      let constraint = queryResult.rows[i];
      let foreignTable = constraint['foreign_table_name'];
      if (constraint['foreign_table_schema'] !== this.defaultSchema) {
        foreignTable = constraint['foreign_table_schema'] + '.' +
            constraint['foreign_table_name'];
      }
      let name =  constraint['constraint_name'];
      if (constraints[name] === void 0) {
        constraints[name] = {'tableName' : foreignTable, 'columns' : {}}
      }
      constraints[name]['columns'][constraint['column_name']] = constraint['foreign_column_name'];
    }
    // for(let [name, constraint] of Object.entries(constraints)){
    //   table.foreignKeys[name] = {
    //     'tableName': constraint.tableName,
    //     'columns': constraint.columns,
    //   };
    // }
    return true;
  }

  async resolveTableColumns(table) {
    let tableName = this.db.quoteValue(table.name);
    let schemaName = this.db.quoteValue(table.schemaName);
    let orIdentity = '';
    if (this.db.serverVersion &&
        helper.versionCompare(this.db.serverVersion, '12.0') >= 0) {
      orIdentity = `OR attidentity != ''`;
    }
    let sql = `SELECT
    d.nspname AS table_schema,
    c.relname AS table_name,
    a.attname AS column_name,
    COALESCE(td.typname, tb.typname, t.typname) AS data_type,
    COALESCE(td.typtype, tb.typtype, t.typtype) AS type_type,
    (SELECT nspname FROM pg_namespace WHERE oid = COALESCE(td.typnamespace, tb.typnamespace, t.typnamespace)) AS type_scheme,
    a.attlen AS character_maximum_length,
    pg_catalog.col_description(c.oid, a.attnum) AS column_comment,
    a.atttypmod AS modifier,
    a.attnotnull = false AS is_nullable,
    CAST(pg_get_expr(ad.adbin, ad.adrelid) AS varchar) AS column_default,
    coalesce(pg_get_expr(ad.adbin, ad.adrelid) ~ 'nextval',false) ${orIdentity} AS is_autoinc,
    pg_get_serial_sequence(quote_ident(d.nspname) || '.' || quote_ident(c.relname), a.attname) AS sequence_name,
    CASE WHEN COALESCE(td.typtype, tb.typtype, t.typtype) = 'e'::char
        THEN array_to_string((SELECT array_agg(enumlabel) FROM pg_enum WHERE enumtypid = COALESCE(td.oid, tb.oid, a.atttypid))::varchar[], ',')
        ELSE NULL
    END AS enum_values,
    CASE atttypid
         WHEN 21 /*int2*/ THEN 16
         WHEN 23 /*int4*/ THEN 32
         WHEN 20 /*int8*/ THEN 64
         WHEN 1700 /*numeric*/ THEN
              CASE WHEN atttypmod = -1
               THEN null
               ELSE ((atttypmod - 4) >> 16) & 65535
               END
         WHEN 700 /*float4*/ THEN 24 /*FLT_MANT_DIG*/
         WHEN 701 /*float8*/ THEN 53 /*DBL_MANT_DIG*/
         ELSE null
      END   AS numeric_precision,
      CASE
        WHEN atttypid IN (21, 23, 20) THEN 0
        WHEN atttypid IN (1700) THEN
        CASE
            WHEN atttypmod = -1 THEN null
            ELSE (atttypmod - 4) & 65535
        END
           ELSE null
      END AS numeric_scale,
    CAST(
             information_schema._pg_char_max_length(information_schema._pg_truetypid(a, t), information_schema._pg_truetypmod(a, t))
             AS numeric
    ) AS size,
    a.attnum = any (ct.conkey) as is_pkey,
    COALESCE(NULLIF(a.attndims, 0), NULLIF(t.typndims, 0),(t.typcategory='A')::int) AS dimension
FROM
    pg_class c
    LEFT JOIN pg_attribute a ON a.attrelid = c.oid
    LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid AND a.attnum = ad.adnum
    LEFT JOIN pg_type t ON a.atttypid = t.oid
    LEFT JOIN pg_type tb ON (a.attndims > 0 OR t.typcategory='A') AND t.typelem > 0 AND t.typelem = tb.oid OR t.typbasetype > 0 AND t.typbasetype = tb.oid
    LEFT JOIN pg_type td ON t.typndims > 0 AND t.typbasetype > 0 AND tb.typelem = td.oid
    LEFT JOIN pg_namespace d ON d.oid = c.relnamespace
    LEFT JOIN pg_constraint ct ON ct.conrelid = c.oid AND ct.contype = 'p'
WHERE
    a.attnum > 0 AND t.typname != '' AND NOT a.attisdropped
    AND c.relname = ${tableName}
    AND d.nspname = ${schemaName}
ORDER BY
    a.attnum;`;

    let queryResult = await this.db.createCommand(sql).queryAll();

    if (helper.empty(queryResult.rows)) {
      return false;
    }

    for (let i = 0, l = queryResult.rows.length; i < l; i++) {
      let column = queryResult.rows[i];
      column = this.loadColumnSchema(column);
      table.columns[column.name] = column;

      if (column.isPrimaryKey) {
        table.primaryKey[i] = column.name;
        if (table.sequenceName === null) {
          table.sequenceName = column.sequenceName;
        }
        column.defaultValue = null;
        continue;
      }
      if (column.defaultValue) {
        if (
            [Schema.TYPE_TIME, Schema.TYPE_DATE, Schema.TYPE_TIMESTAMP].includes(
                column.type) &&
            [
              'NOW()',
              'CURRENT_TIMESTAMP',
              'CURRENT_DATE',
              'CURRENT_TIME'].includes(column.defaultValue.toUpperCase())
        ) {
          column.defaultValue = new Expression(column.defaultValue);
          continue;
        }
        if (column.type === 'boolean') {
          column.defaultValue = column.defaultValue === 'true';
          continue;
        }
        let matches = /^B'(.*?)'::|^'(\d+)'::"bit"$/.exec(column.defaultValue);
        if (matches !== null) {
          column.defaultValue = helper.bindec(matches[1]);
          continue;
        }
        matches = /^'(.*?)'::/.exec(column.defaultValue);
        if (matches !== null) {
          column.defaultValue = column.jsTypecast(matches[1]);
          continue;
        }
        // numeric(5,2) DEFAULT (0)::numeric NOT NULL
        matches = /^(\w+\([,\d.]+\) DEFAULT \((.*?)\))::.+/i.exec(
            column.defaultValue);
        if (matches !== null) {
          column.defaultValue = column.jsTypecast(matches[2]);
          continue;
        }

        column.defaultValue = column.jsTypecast(column.defaultValue);
      }
    }
    return true;
  }

  loadColumnSchema(data) {
    let column = new ColumnSchema();
    column.allowNull = data['is_nullable'];
    column.autoIncrement = data['is_autoinc'];
    column.comment = data['column_comment'];
    column.unsigned = false;
    column.isPrimaryKey = data['is_pkey'];
    column.name = data['column_name'];
    column.precision = data['numeric_precision'];
    column.scale = data['numeric_scale'];
    column.size = data['size'] !== null ? Number(data['size']) : null;
    column.dimension = Number(data['dimension']);
    column.defaultValue = data['column_default'];
    column.dbType = data['data_type'];

    if (data['type_scheme'] !== null &&
        [this.defaultSchema, 'pg_catalog'].includes(data['type_scheme'])) {
      column.dbType = data['type_scheme'] + '.' + data['data_type'];
    }

    column.enumValues = data['enum_values'] !== null
        ? String(data['enum_values']).replace('\'\'', '\'').split(',')
        : null;

    if (column.defaultValue !== null &&
        SERIAL_SEQUENCE_REGEX.test(column.defaultValue)) {
      column.sequenceName = String(column.defaultValue).
      replaceAll(/nextval|:\:|regclass|'\)|\('/, '');
    } else {
      let tableSequence = this.createTableSchema();
      this.resolveTableNames(tableSequence, data['sequence_name']);
      column.sequenceName = tableSequence.fullName;
    }
    column.type = this.typeMap[column.dbType] ?? 'string';
    column.jsType = this.getColumnJsType(column.dbType);

    return column;
  }

  createTableSchema() {
    return new TableSchema();
  }

  /**
   * Resolves the table name and schema name (if any).
   * @param table
   * @param name
   */
  resolveTableNames(table, name) {
    const parts = String(name).replaceAll('"', '').split('.');
    if (helper.isset(parts[1])) {
      table.schemaName = parts[0];
      table.name = parts[1];
    } else {
      table.schemaName = String(this.defaultSchema);
      table.name = parts[0];
    }

    table.fullName = table.schemaName !== this.defaultSchema
        ? `${table.schemaName}.${table.name}`
        : table.name;

    return table;
  }

  /**
   * @returns {Promise<*>}
   */
  async findSchemaNames() {
    const sql = `SELECT "ns"."nspname"
      FROM "pg_namespace" AS "ns"
      WHERE "ns"."nspname" != 'information_schema' AND "ns"."nspname" NOT LIKE 'pg_%'
      ORDER BY "ns"."nspname" ASC
    `;
    return this.db.createCommand(sql).queryColumn();
  }

  /**
   * @param {string} schema
   * @returns {Promise<*>}
   */
  async findTableNames(schema = '') {
    let schemaName = String(schema);
    if (schema === '') {
      schemaName = String(this.defaultSchema);
    }
    const sql = `SELECT c.relname AS table_name
    FROM pg_class c
    INNER JOIN pg_namespace ns ON ns.oid = c.relnamespace
    WHERE ns.nspname = :schemaName AND c.relkind IN ('r','v','m','f', 'p')
    ORDER BY c.relname
    `;

    return this.db.createCommand(sql, {
      ':schemaName': schemaName,
    }).queryColumn();

  }

}

module.exports = Schema;