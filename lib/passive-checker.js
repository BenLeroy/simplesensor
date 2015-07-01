'use strict';

var events = require('events');
var util = require("util");


var aliveChecker = function() {};

util.inherits(aliveChecker, events.EventEmitter);

aliveChecker.prototype.isAlive = function (sensor) {
  var that = this;
  var tSpan = sensor.checkedAt.getTime() + sensor.frequency * 1000 + sensor.lag;

  if(Date.now() > tSpan && sensor.status !== 'Missing' && sensor.status !== 'OFF')
    {
      sensor.updateAttributes({
        status: 'Missing'
        , checkedAt: new Date()
      }
      , function (err, instance){
        that.emit('sensor:Missing', instance);
      });
    }
};

aliveChecker.prototype.areAlive = function (sensors) {
  var that = this;
  sensors.forEach(function (sensei){
    that.isAlive(sensei);
  });
};

module.exports = new aliveChecker();
