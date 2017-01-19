var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})
var url = require('url');

if (process.env.NODE_ENV === "development") {
    var pool = new Pool({database: 'peady_note'})
} else {
    var pool = new Pool({database: 'peady_note_test'});
}

module.exports = function deleteResponse(request, response) {
    var queryData = url.parse(request.url, true).query;

    pool.query("DELETE FROM items WHERE id ='" + queryData['id'] + "'", function(err, res) {
        if (err) {
            return console.error('error happened during query', err)
        }

        response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
        response.end();
    });
};
