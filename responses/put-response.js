var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})
var url  = require('url');

if (process.env.NODE_ENV === "development") {
    var pool = new Pool({database: 'peady_note'})
} else {
    var pool = new Pool({database: 'peady_note_test'});
}

module.exports = function putResponse(request, response) { 
    var queryData = url.parse(request.url, true).query;

    pool.query("UPDATE items SET title = '" + queryData['title'] + "' WHERE id ='" + queryData['id'] + "'", function(err, res) {
        if (err) {
            return console.error('error happened during query', err)
        }
        pool.query("SELECT * FROM items WHERE id = '" + queryData['id'] + "'", function(err, data) {
            if (err) {
                return console.error('error happened during query', err)
            }

            response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});

                response.write(
                    '<li id="list-item-' + queryData['id'] + '">' +
                    queryData['title'] +
                    ' <a href="#" data-id="' +
                    queryData['id'] +
                    '" class="edit-button">Edit</a> <a href="#" data-id="' +
                    queryData['id'] + '" class="delete-button">Delete</a></li>'
                );
                response.end();
            })
        });
    };
