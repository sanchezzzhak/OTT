const helper = require('../helper');
const Expression = require('../expression');

const makeOrder = (column) => {
  if (helper.instanceOf(column, Order)) {
    return Order;
  }
  if (helper.instanceOf(column, Expression)) {
    return new Order(null, null, column);
  }

  let match = /^(.*?)\s+((?:a|de)sc)$/i.exec(column);
  if (match !== null) {
    return new Order(
        match[1],
        String(match[2]).toUpperCase().indexOf(Order.SORT_DESC) !== -1
            ? Order.SORT_DESC
            : Order.SORT_ASC,
        null,
    );
  }
  return new Order(column, Order.SORT_ASC, null);
};

class Order {

  static SORT_ASC = 'ASC';
  static SORT_DESC = 'DESC';

  expression;
  column;
  direction;

  constructor(column, direction, expression) {
    this.column = column;
    this.direction = direction;
    this.expression = expression;
  }

  /**
   *
   * @param {array|Object|string|Expression|Order} columns
   * @returns {Order[]}
   */
  static from(columns) {
    // expresion
    if (helper.instanceOf(columns, Expression)) {
      return [makeOrder(columns)];
    }
    const results = [];
    // create array from string
    if (typeof columns === 'string') {
      columns = helper.splitCommaString(columns);
    }
    for (let column of columns) {
      if (helper.instanceOf(column, Expression)) {
        results.push(makeOrder(column));
        continue;
      }
      if (helper.instanceOf(column, Order)) {
        results.push(column);
        continue;
      }
      if (typeof column === 'object') {
        let structure = helper.extractObject(column);
        results.push(new Order(structure.key, structure.value, null));
        continue;
      }
      results.push(makeOrder(column));
    }

    let sorted = {};
    let i = 0;
    __mainOrderLoop:
    for (let key in results) {
      let order = results[key];
      if (order.expression) {
        // check duplicate expresion for sorted
        let expString = order.expression.toString();
        for(let key in sorted) {
          if (
              helper.instanceOf(sorted[key], Expression) &&
              sorted[key].toString() === expString
          ) {
            continue __mainOrderLoop;
          }
        }
        sorted[String(++i)] = order;
        continue;
      }
      sorted[order.column] = order;
    }
    return Object.values(sorted);
  }

}

module.exports = Order;