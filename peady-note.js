var http = require('http');
var Pool = require('pg').Pool;
var qs = require('querystring');
//var conString = "postgres://localhost:5432/peady_note";
var pool = new Pool({user: 'deploy', database: 'peady_note', host: 'localhost'})
//var listItems = list.listItems;
/*
for(var x = 0; x < listItems.length; x++) {
  console.log(listItems[x].title)
}
*/
// connect to our database
//client.connect(); 
//var query = client.query('SELECT * FROM lists');
//console.log(query);

http.createServer(function (request, response) {
  if (request.method == "GET") {
    pool.query('SELECT * FROM items WHERE list_id = 1', function(err, res) {
      if (err) {
        return console.error('error happened during query', err)
      }
      response.writeHead(200, {'Content-Type': 'text/html'});

      response.write('<!doctype html>\n<html lang="en">\n' + 
      '\n<meta charset="utf-8">\n<title>Peady Note</title>\n' + 
      '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
      '\n\n<h1>Peady Note</h1>\n' + 
      '<div id="content"><ul>' +
      '\n');

      for(var x = 0 ; x < res.rows.length; x++) {
        response.write('<li>' + res.rows[x].title + '</li>');
      }

      response.write('<form method="post"><label>New item: </label><input name="title"></input><input type="submit" value="Submit"></input></form>\n');
      response.write('</ul></div>');

      response.end();
    })
  } else {
    var body = '';

    request.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        post = qs.parse(body);
        // use post['blah'], etc.
        pool.query("INSERT INTO items (title, list_id) VALUES ('" + post['title'] + "', 1)", function(err, res) {
          if (err) {
              return console.error('error happened during query', err)
          }

          pool.query('SELECT * FROM items WHERE list_id = 1', function(err, res) {
              if (err) {
                return console.error('error happened during query', err)
              }
              response.writeHead(200, {'Content-Type': 'text/html'});

              response.write('<!doctype html>\n<html lang="en">\n' + 
              '\n<meta charset="utf-8">\n<title>Peady Note</title>\n' + 
              '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
              '\n\n<h1>Peady Note</h1>\n' + 
              '<div id="content"><ul>' +
              '\n');

              for(var x = 0 ; x < res.rows.length; x++) {
                response.write('<li>' + res.rows[x].title + '</li>');
              }

              response.write('<form method="post"><label>New item: </label><input name="title"></input><input type="submit" value="Submit"></input></form>\n');
              response.write('</ul></div>');

              response.end();
            })
      })
    });
  }
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
