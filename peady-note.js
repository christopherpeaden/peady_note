var http = require('http');
var Pool = require('pg').Pool;
var qs = require('querystring');
var pool = new Pool({user: 'deploy', database: 'peady_note', host: 'localhost'})
var url = require('url');
var writePage = require('./write-page.js');

http.createServer(function (request, response) {
    if (request.method == "GET") {
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
        console.log(queryData);
        pool.query("DELETE FROM items WHERE id ='" + queryData['id'] + "'", function(err, res) {
            if (err) {
                return console.error('error happened during query', err)
            }
              writePage(response);
          })
    }
    console.log(request.method);
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
