'use strict';
process.env.NODE_ENV = 'test';

var app = require('../server/server.js');
var Browser = require('zombie');
var request = require('supertest');

describe('Creating test data', function() {

  it('Adding sensors using /inCheck', function (done) {
    request(app)
      .post('/api/sensors/inCheck')
      .type('form')
      .send({key: "abcdef"})
      .send({status: 'NOK'})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(/NOK/)
      .end(function (err, res) {
        if(err) return done(err);
        request(app)
          .post('/api/sensors/inCheck')
          .type('form')
          .send({key: "ghijkl"})
          .send({status: 'NOK'})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(/NOK/)
          .end(function (err, res) {
            if(err) return done(err);
            request(app)
              .post('/api/sensors/inCheck')
              .type('form')
              .send({key: "mnopqr"})
              .send({status: 'NOK'})
              .expect('Content-Type', /json/)
              .expect(200)
              .expect(/NOK/)
              .end(function (err, res) {
                if(err) return done(err);
                done();
              });
          });
      });
  });
});

describe('Visitor comes to homepage', function() {

  before(function (done) {
    this.server = app.listen(3001);
    this.browser = new Browser({debug: true, site: 'http://localhost:3001/'});
    this.browser.visit('#/list', done);
  });

  it('should display homepage & sensor list', function (){
    this.browser.assert.success();
    this.browser.assert.text('h1', 'Sensors');
    this.browser.assert.elements("div#scroller");
    this.browser.assert.elements("img[ng-show='loading']");
    this.browser.assert.elements("div[ui-sref='consult({id: sensor.id})']"
      , {atLeast: 3}
    );

  });


  describe('He navigates to events list page', function () {

    before(function (done) {
      this.browser.clickLink('div ul li.navimenu a[ui-sref="events"]', done);
    });

    it('should show an event list', function () {
		this.browser.assert.text('h1', 'Last events');
    this.browser.assert.elements("div#scrolling");
    this.browser.assert.elements("img[ng-show='loading']");
    });
  });
});
