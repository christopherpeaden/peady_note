var qs = require('querystring');
var Pool = require('pg').Pool;

if (process.env.NODE_ENV === "development") {
    var pool = new Pool({database: 'peady_note'})
} else {
    var pool = new Pool({database: 'peady_note_test'})
}

module.exports = function writePage(response) {
    pool.query('SELECT * FROM items WHERE list_id = 1', function(err, data) {
        if (err) {
            return console.error('error happened during query', err)
        }
        response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});

        response.write('<!doctype html>\n<html lang="en">\n' + 
            '\n<meta charset="utf-8">\n<title>Peady Note</title>\n' + 
            '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
            '\n\n<h1>Peady Note</h1>\n' + 
            '<div id="content"><ul id="content-list">' +
        '\n');

        for(var x = 0 ; x < data.rows.length; x++) {
            response.write('<li id="list-item-' + data.rows[x].id + '">' + data.rows[x].title + 
                ' <a href="#" data-id="' + 
                data.rows[x].id +
                '" class="edit-button">Edit</a> <a href="#" data-id="' +
                data.rows[x].id + '" class="delete-button">Delete</a></li>'
            );
        }

        response.write('</ul></div>');
        response.write('<form method="POST"><label>New item: </label><input name="title"></input><input type="submit" value="Submit"></input></form>\n');
        response.write("<script type='text/javascript' src='assets/javascripts/xml-http-requests.js'></script>");
        response.write("<script type='text/javascript' src='assets/javascripts/edit-buttons.js'></script>");
        response.end();
    })
}

