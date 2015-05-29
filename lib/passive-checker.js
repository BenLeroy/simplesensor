'use strict';

var events = require('events');
var util = require("util");


var aliveChecker = function() {};

util.inherits(aliveChecker, events.EventEmitter);

aliveChecker.prototype.isAlive = function (sensor) {
  var that = this;

  var wtf = sensor.checkedAt.getTime() + sensor.frequency * 1000;

  if(Date.now() > wtf && sensor.status !== 'Missing')
    {
      sensor.updateAttributes({status: 'Missing', checkedAt: new Date()}
        , function (err, instance){
          that.emit('sensor:missed', instance);
          console.log(instance.name + ' is now ' + instance.status);
        });
    }
    else if(sensor.status === "Up") {
      that.emit('sensor:up', sensor);
    }
    else if (sensor.status === 'Down') {
      that.emit('sensor:down', sensor);
    }
};

aliveChecker.prototype.areAlive = function (sensors) {
  var that = this;
  sensors.forEach(function (sensei){
    that.isAlive(sensei);
  });
};

module.exports = new aliveChecker();
