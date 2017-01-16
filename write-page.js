var http = require('http');
var Pool = require('pg').Pool;
var qs = require('querystring');
var pool = new Pool({user: 'deploy', database: 'peady_note', host: 'localhost'})

module.exports = function writePage(response) {
    pool.query('SELECT * FROM items WHERE list_id = 1', function(err, data) {
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

        for(var x = 0 ; x < data.rows.length; x++) {
          response.write('<li>' + data.rows[x].title + ' <a href="#" data-id="' + data.rows[x].id + '" class="edit-button">Edit</a> <a href="#" data-id="' + data.rows[x].id + '" class="delete-button">Delete</a></li>');
        }

        response.write('<form method="POST"><label>New item: </label><input name="title"></input><input type="submit" value="Submit"></input></form>\n');
        response.write('</ul></div>');
        response.write("<script src='assets/javascripts/xml-http-requests.js'></script>");

        response.end();
    })
}
