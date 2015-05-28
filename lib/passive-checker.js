'use strict';

var events = require('events');
var util = require("util");


var aliveChecker = function (app){
};

util.inherits(aliveChecker, events.EventEmitter);

aliveChecker.prototype.isAlive = function (sensor) {
  var that = this;
  if(
    Date.now() > sensor.checkedAt.getTime() + sensor.frequency * 1000
    )
    {
      sensor.updateAttributes({status: 'Down', modifiedAt: new Date()}
        , function (err, instance){
          that.emit('oneDown', instance);
          console.log(instance.name + ' is down since ' + instance.modifiedAt);
        });
    }
    else {
      that.emit('sensor:down', sensor);
      console.log('Sensor Down');
    }
};

aliveChecker.prototype.areAlive = function (sensors) {
  var that = this;
  sensors.forEach(function (sensei){
    that.isAlive(sensei);
  });
};

module.exports = function(app) {
  return new aliveChecker(app);
};
