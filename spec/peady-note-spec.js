process.env.NODE_ENV = 'test';
var request = require('request');
var peadyNote = require('../peady-note.js');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

describe('Note', function() {
    beforeEach(function(done) {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        driver.get('http://localhost').then(done);
    });

    // Close the website after each test is run (so that it is opened new each time)
    afterEach(function(done) {
        driver.quit().then(done);
    });

    it("responds to CRUD actions", function() {
        // Create new notes
        for (var x = 1; x < 5; x++) {
            driver.findElement(webdriver.By.name('title')).sendKeys("Test Text " + x)
                .then(driver.findElement(webdriver.By.name('submit')).click())
                .then(driver.findElement(webdriver.By.name('title')).clear());
        }

        for (var x = 1; x < 5; x++) {
            // Click edit button
            driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//ul/li[contains(., 'Test Text " + x + "')]/a[1]")), 5 * 1000)
                .then(edit => edit.click())

            // Update note text
            .then(driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//ul/li/form/input")), 5 * 1000)
                .then(input => input.sendKeys("Updated")))

            // Save the note 
            .then(driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//ul/li/a[1]")), 5 * 1000)
                .then(save => save.click()))

            // Delete the note
            .then(driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//li[contains(., 'Test Text " + x + " Updated')]/a[2]")), 5 * 1000)
                .then(del => del.click()));
        }

    });
});
