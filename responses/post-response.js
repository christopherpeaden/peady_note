var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})
var qs = require('querystring');
var writePage = require('./write-page.js');

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
            writePage(response);
        })
    });
}
