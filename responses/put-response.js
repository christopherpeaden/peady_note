var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})
var url  = require('url');

module.exports = function putResponse(request, response) { 
    var queryData = url.parse(request.url, true).query;

    pool.query("UPDATE items SET title = '" + queryData['title'] + "' WHERE id ='" + queryData['id'] + "'", function(err, res) {
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
                response.write('<li>' +
                    data.rows[x].title +
                    ' <a href="#" data-id="' +
                    data.rows[x].id +
                    '" class="edit-button">Edit</a> <a href="#" data-id="' +
                    data.rows[x].id + '" class="delete-button">Delete</a></li>'
                );
            }
            response.write('</ul>');
            response.end();
        });
    });
};
