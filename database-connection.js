var pg = require('pg');
var conString = "postgres://localhost:5432/peady_note";
var listItems;

pg.connect(conString, function (err, client, done) {  
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT * FROM items WHERE list_id = 1', function (err, result) {

    if (err) {
      return console.error('error happened during query', err)
    }

    
    listItems = result.rows;

    //for(var x = 0; x < result.rows.length; x++) {
    //  console.log(result.rows[x].title)
    //}
    process.exit(0)
  })
})


exports.listItems = listItems;
