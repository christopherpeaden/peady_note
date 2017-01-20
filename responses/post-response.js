var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})
var qs = require('querystring');
var writePage = require('./write-page.js');

if (process.env.NODE_ENV === "development") {
    var pool = new Pool({database: 'peady_note'})
} else {
    var pool = new Pool({database: 'peady_note_test'});
}

module.exports = function postResponse(request, response) {
    var body = '';

    request.on('data', function (data) {
        body += data;

        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        params = qs.parse(body);
        pool.query("INSERT INTO items (title, list_id) VALUES ('" + params['title'] + "', 1)", function(err, res) {
            if (err) {
                return console.error('error happened during query', err)
            }
            pool.query("SELECT * FROM items ORDER BY id DESC LIMIT 1", function(err, data) {
                if (err) {
                    return console.error('error happened during query', err)
                }
                var item = data.rows[0];

                response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
                response.write(
                    '<li id="list-item-' + item.id + '">' +
                    item.title +
                    ' <a href="#" data-id="' +
                    item.id +
                    '" class="edit-button">Edit</a> <a href="#" data-id="' +
                    item.id + '" class="delete-button">Delete</a></li>'
                );
                response.end();
	    })
	});
    })
};
