const Query = require('./query')

class ActiveQuery extends Query
{
   model;

   constructor(params, model) {
     super(params);
     this.model = model;
   }
}

module.exports = Query;