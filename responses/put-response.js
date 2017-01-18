var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})

module.exports = function putResponse(request, response) { 
  console.log('PUT');
}
