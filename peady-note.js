var http = require('http');
var Pool = require('pg').Pool;
var pool = new Pool({database: 'peady_note'})
var optionsResponse = require('./responses/options-response.js');
var writePage = require('./responses/write-page.js');
var postResponse = require('./responses/post-response.js');
var putResponse = require('./responses/put-response.js');
var deleteResponse = require('./responses/delete-response.js');

http.createServer(function (request, response) {
    switch (request.method) {
        case "OPTIONS": 
            optionsResponse(response);
            break;
        case "GET": 
            writePage(response);
            break;
        case "POST": 
            postResponse(request, response);
            break;
        case "PUT": 
            putResponse(request, response);
            break;
        case "DELETE": 
            deleteResponse(request, response);
            break;
    }
}).listen(3000, 'localhost');
console.log('Server running at http://localhost:3000/');
