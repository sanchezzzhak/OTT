const Expression = require('./expression');
const Schema = require('./schema');
const helper = require('./helper');
const SchemaTypes = require('./consts/schema-types');
const CategoryTypes = require('./consts/category-types');


class ColumnSchemaBuilder {

  db;
  rules = {};

  constructor(type, length, db) {
    this.rules['type'] = String(type);
    this.rules['length'] = length;
    this.db = db;
    this.initCategoryMap();
  }

  /**
   * mapping of abstract column types (keys) to type categories (values).
   */
  initCategoryMap() {
    this.categoryMap = {};
    this.categoryMap[SchemaTypes.TYPE_PK] = CategoryTypes.CATEGORY_PK;
    this.categoryMap[SchemaTypes.TYPE_UPK] = CategoryTypes.CATEGORY_PK;
    this.categoryMap[SchemaTypes.TYPE_BIGPK] = CategoryTypes.CATEGORY_PK;
    this.categoryMap[SchemaTypes.TYPE_UBIGPK] = CategoryTypes.CATEGORY_PK;
    this.categoryMap[SchemaTypes.TYPE_CHAR] = CategoryTypes.CATEGORY_STRING;
    this.categoryMap[SchemaTypes.TYPE_STRING] = CategoryTypes.CATEGORY_STRING;
    this.categoryMap[SchemaTypes.TYPE_TEXT] = CategoryTypes.CATEGORY_STRING;
    this.categoryMap[SchemaTypes.TYPE_TINYINT] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_SMALLINT] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_INTEGER] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_BIGINT] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_FLOAT] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_DOUBLE] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_DECIMAL] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_DATETIME] = CategoryTypes.CATEGORY_TIME;
    this.categoryMap[SchemaTypes.TYPE_TIMESTAMP] = CategoryTypes.CATEGORY_TIME;
    this.categoryMap[SchemaTypes.TYPE_TIME] = CategoryTypes.CATEGORY_TIME;
    this.categoryMap[SchemaTypes.TYPE_DATE] = CategoryTypes.CATEGORY_TIME;
    this.categoryMap[SchemaTypes.TYPE_BINARY] = CategoryTypes.CATEGORY_OTHER;
    this.categoryMap[SchemaTypes.TYPE_BOOLEAN] = CategoryTypes.CATEGORY_NUMERIC;
    this.categoryMap[SchemaTypes.TYPE_MONEY] = CategoryTypes.CATEGORY_NUMERIC;

  }

  /**
   * Adds a `NOT NULL` constraint to the column.
   *
   * @returns {ColumnSchemaBuilder}
   */
  notNull() {
    this.rules['isNotNull'] = true;
    return this;
  }

  /**
   * Adds a `NULL` constraint to the column.
   *
   * @returns {ColumnSchemaBuilder}
   */
  null() {
    this.rules['isNotNull'] = false;
    return this;
  }

  /**
   * Adds a `UNIQUE` constraint to the column.
   *
   * @returns {ColumnSchemaBuilder}
   */
  unique() {
    this.rules['isUnique'] = true;
    return this;
  }

  /**
   * Marks column as unsigned.
   *
   * @returns {ColumnSchemaBuilder}
   */
  unsigned() {
    switch (this.rules['type']) {
      case SchemaTypes.TYPE_PK:
        this.rules['type'] = String(SchemaTypes.TYPE_UPK);
        break;
      case SchemaTypes.TYPE_BIGPK:
        this.rules['type'] = String(SchemaTypes.TYPE_UBIGPK);
        break;
    }
    this.rules['isUnsigned'] = true;
    return this;
  }

  /**
   * Specify additional SQL to be appended to column definition.
   * Position modifiers will be appended after column definition in databases that support them.
   *
   * @param {string} sql
   * @returns {ColumnSchemaBuilder}
   */
  append(sql) {
    this.rules['append'] = sql;
    return this;
  }

  /**
   * Sets a `CHECK` constraint for the column.
   *
   * @param check
   * @returns {ColumnSchemaBuilder}
   */
  check(check) {
    this.rules['check'] = check;
    return this;
  }

  /**
   * Specifies the comment for column.
   *
   * @param {string} comment
   * @returns {ColumnSchemaBuilder}
   */
  comment(comment) {
    this.rules['comment'] = comment;
    return this;
  }

  /**
   * Specify the default value for the column.
   *
   * @param value
   * @returns {ColumnSchemaBuilder}
   */
  defaultValue(value) {
    if (value === void 0 || value === null) {
      this.null();
    }
    this.rules['default'] = value;
    return this;
  }

  /**
   * Specify the default SQL expression for the column.
   *
   * @param value
   * @returns {ColumnSchemaBuilder}
   */
  defaultExpression(value) {
    return this.defaultValue(new Expression(value));
  }

  /**
   * Builds the length/precision part of the column.
   *
   * @returns {string}
   */
  buildLength() {
    if (helper.empty(this.rules['length'])) {
      return '';
    }
    if (Array.isArray(this.rules['length'])) {
      this.rules['length'] = this.rules['length'].join(',');
    }
    return `(${this.rules['length']})`;
  }

  buildUnsigned() {
    return '';
  }

  /**
   * Builds the not null constraint for the column.
   *
   * @returns {string}
   */
  buildNotNull() {
    const isNullNull = this.rules['isNotNull'] ?? null;
    if (isNullNull === true) {
      return ' NOT NULL';
    }
    if (isNullNull === false) {
      return ' NULL';
    }
    return '';
  }

  buildDefault() {
    let defaultValue = this.rules['default'] ?? null;
    if (defaultValue === null) {
      defaultValue = this.rules['isNotNull'] === false ? 'NULL' : null;
    } else if (helper.instanceOf(defaultValue, Expression)) {
      defaultValue = this.db.getQueryBuilder.buildExpression(defaultValue);
    } else {
      switch (typeof defaultValue) {
        case 'bigint':
          defaultValue = defaultValue.toString();
          break;
        case 'number':
          defaultValue = String(defaultValue);
          break;
        case 'boolean':
          defaultValue = defaultValue ? 'TRUE' : 'FALSE';
          break;
        default:
          defaultValue = defaultValue !== void 0
              ? `'${defaultValue}'`
              : '';
          break;
      }
    }
    if (helper.isEmpty(defaultValue)) {
      return '';
    }

    return ` DEFAULT ${defaultValue}`;
  }

  buildUnique() {
    return (this.rules['isUnique'] ?? false) ? ' UNIQUE' : '';
  }

  /**
   * Builds the check constraint for the column.
   * @returns {string}
   */
  buildCheck() {
    return '';
  }

  /**
   * Builds the comment specification for the column.
   * @returns {string}
   */
  buildComment() {
    return helper.isset(this.rules['check']) && this.rules['check']
        ? ` CHECK (${this.rules['check']})`
        : '';
  }

  /**
   * Builds the custom string that's appended to column definition.
   */
  buildAppend() {
    return (this.rules['append'] ?? false)
        ? ` ${this.rules['append']}`
        : '';
  }

  buildPos() {
    return '';
  }

  /**
   * Returns the complete column definition from input format.
   *
   * @param {string} format
   * @returns {{val, key: *, token}}
   */
  build(format) {
    const placeholders = {
      '{type}': this.rules.type,
      '{length}': this.buildLength(),
      '{unsigned}': this.buildUnsigned(),
      '{notnull}': this.buildNotNull(),
      '{unique}': this.buildUnique(),
      '{default}': this.buildDefault(),
      '{check}': this.buildCheck(),
      '{comment}': this.buildComment(),
      '{pos}': this.buildPos(),
      '{append}': this.buildAppend(),
    };

    return helper.strtr(format, placeholders);
  }

  toString() {
    let format = '{type}{length}{notnull}{unique}{default}{check}{comment}{append}';
    let categoryMap = this.categoryMap[this.rules['type']] ?? null;
    if (categoryMap !== null && CategoryTypes.CATEGORY_PK === categoryMap) {
      format = '{type}{check}{comment}{append}';
    }
    return this.build(format);
  }

}

module.exports = ColumnSchemaBuilder;
