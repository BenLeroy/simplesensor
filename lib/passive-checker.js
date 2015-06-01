'use strict';

var events = require('events');
var util = require("util");


var aliveChecker = function() {};

util.inherits(aliveChecker, events.EventEmitter);

aliveChecker.prototype.isAlive = function (sensor) {
  var that = this;

  var tSpan = sensor.checkedAt.getTime() + sensor.frequency * 1000;

  if(Date.now() > tSpan && sensor.status !== 'Missing')
    {
      sensor.updateAttributes({status: 'Missing', checkedAt: new Date()}
        , function (err, instance){
          that.emit('sensor:missed', instance);
          console.log(instance.name + ' is now ' + instance.status);
        });
    }
    else if (sensor.status === 'NOK') {
      that.emit('sensor:nok', sensor);
    }
    /*else if (sensor.status === 'OK') {
      that.emit('sensor:ok', sensor);
    }*/
};

aliveChecker.prototype.areAlive = function (sensors) {
  var that = this;
  sensors.forEach(function (sensei){
    that.isAlive(sensei);
  });
};

module.exports = new aliveChecker();
