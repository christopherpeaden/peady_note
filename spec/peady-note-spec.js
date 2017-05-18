process.env.NODE_ENV = 'test';
var request = require('request');
var peadyNote = require('../peady-note.js');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

describe('Peady Note', function() {
    beforeEach(function(done) {
        this.webdriver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        this.webdriver.get('http://localhost').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    /*
    afterEach(function(done) {
        this.webdriver.quit().then(done);
    });
    */

    xit('Responds to GET request', function() {
        var res = request('http://localhost', function(error, response, body) {
            if (!error && response.statusCode == 200) {
	    }

	})
	expect(res).toEqual(res);
    });

    it("Integration", function() {
        this.webdriver.findElement(webdriver.By.name('title')).sendKeys('new item');
        this.webdriver.findElement(webdriver.By.name('submit')).click();
    });
});
