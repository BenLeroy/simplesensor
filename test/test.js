'use strict';
process.env.NODE_ENV = 'test';

var app = require('../server/server.js');
var Browser = require('zombie');


describe('Visitor comes to homepage', function() {

  before(function (done) {
    this.server = app.listen(3001);
    this.browser = new Browser({site: 'http://localhost:3001/'});
    this.browser.visit('/#/', done);
  });

  it('should display homepage', function (){
    this.browser.assert.success();
    this.browser.assert.text('h1', 'Sondes');
    //this.browser.assert.attribute('div ul li.navimenu a', 'ui-sref', 'list');
  });


  describe('He navigates to sensor list page', function () {

    before(function (done) {
      this.browser.clickLink('div ul li.navimenu a[ui-sref="list"]', done);
    });

    it('should show a sensor list', function () {
		this.browser.assert.text('h1', 'Sondes');
		this.browser.assert.elements("div.list-group a[ui-sref='sensorEdit({id: sensor.id})']", {atLeast: 3});

    });
  });
});
