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
        setTimeout(function() {
            driver.quit().then(done);
        }, 2500);
    });

    it("responds to CRUD actions", function() {
        // Create new notes
        for (var x = 0; x < 3; x++) {
            driver.findElement(webdriver.By.name('title')).sendKeys('Test Text ' + (x + 1));
            driver.findElement(webdriver.By.name('submit')).click();
            driver.findElement(webdriver.By.name('title')).clear();
        }

        // Click the edit buttons
        driver.wait(webdriver.until.elementsLocated(webdriver.By.linkText('Edit')), 5 * 1000)
            .then(edits => {
                edits[0].click();
                edits[1].click();
                edits[2].click();

                // Modify the text of the notes
                driver.wait(webdriver.until.elementsLocated(webdriver.By.xpath('//input')), 5 * 1000)
                    .then(inputs => {
                        inputs[0].sendKeys(" updated");
                        inputs[1].sendKeys(" edited");
                        inputs[2].sendKeys(" changed");
        
                        // Click the save buttons
                        driver.wait(webdriver.until.elementsLocated(webdriver.By.linkText('Save')), 5 * 1000)
                            .then(saves => {
                                saves[0].click();
                                saves[1].click();
                                saves[2].click();
                                // Selenium will not wait for the delete buttons to appear before clicking them, so we are using a brief setTimout here
                                setTimeout(() => {
                                    driver.wait(webdriver.until.elementsLocated(webdriver.By.linkText('Delete')), 5 * 1000)
                                        .then(dels => {
                                            dels[0].click();
                                            dels[1].click();
                                            dels[2].click();
                                        });
                                }, 500);
                            });
                    });
            });
    });
});
