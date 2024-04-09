const Base = require('./base');

class Expression
{
  /** @type {string} the DB expression */
  expression;
  /** @type {object|Map} list of parameters that should be bound for this expression.*/
  params;
  
  constructor(expresion, params = {}) {
    this.expression = expresion;
    this.params = params;
    
    this.toString = function(){
      return this.expression;
    }
  }
  
}

module.exports = Expression;