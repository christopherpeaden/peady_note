var http = require('http');
var Pool = require('pg').Pool;
var qs = require('querystring');
var pool = new Pool({database: 'peady_note'})
var url = require('url');
var writePage = require('./write-page.js');

http.createServer(function (request, response) {
    if (request.method == 'OPTIONS') {
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
    } else if (request.method == "GET") {
        writePage(response);
    } else if (request.method == "POST") {
        var body = '';

        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            post = qs.parse(body);
            pool.query("INSERT INTO items (title, list_id) VALUES ('" + post['title'] + "', 1)", function(err, res) {
                if (err) {
                    return console.error('error happened during query', err)
                }
                writePage(response);
            })
        });
    } else if (request.method == "DELETE") {
        var queryData = url.parse(request.url, true).query;
        pool.query("DELETE FROM items WHERE id ='" + queryData['id'] + "'", function(err, res) {
            if (err) {
                return console.error('error happened during query', err)
            }
            pool.query('SELECT * FROM items WHERE list_id = 1', function(err, data) {
                if (err) {
                  return console.error('error happened during query', err)
                }
              
                response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});

                response.write('<ul>\n');

                for(var x = 0 ; x < data.rows.length; x++) {
                  response.write('<li>' + data.rows[x].title + ' <a href="#" data-id="' + data.rows[x].id + '" class="edit-button">Edit</a> <a href="#" data-id="' + data.rows[x].id + '" class="delete-button">Delete</a></li>');
          }
              response.write('</ul>');
              response.end();
            });
          });
    }
}).listen(3000, 'localhost');
console.log('Server running at http://localhost:3000/');
