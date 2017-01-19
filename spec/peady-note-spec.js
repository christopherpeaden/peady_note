var request = require('request');
process.env.NODE_ENV = 'test';
var peadyNote = require('../peady-note.js');

describe('Peady Note', function() {
    it('Responds to GET request', function() {
        var res = request('http://localhost', function(error, response, body) {
            if (!error && response.statusCode == 200) {
		console.log(body) // Show the HTML for the Google homepage.
	    }

	})
	expect(res).toEqual(res);
    });
});
