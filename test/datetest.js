'use strict';
process.env.NODE_ENV = 'test';

var loopback = require('loopback');
var app = loopback();
var app = require('../server/server.js')
var Sensor = app.models('Sensor');
Sensor.attachTo(app.memory());

console.log(Sensor);

/*var TestDataBuilder = require('loopback-testing').TestDataBuilder;
var ref = TestDataBuilder.ref;
var context = {};

new TestDataBuilder()
  .define('Sensor', Sensor, {
    name: 'Probetest'
    , status: 'Up'
  })
  .buildTo(context, function (err) {
    context.Sensor;
    console.log(context);
  });
*/