module.exports = function(app, cb) {

  var sensors = app.models.Sensor;

  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  var checker = require('../../lib/passive-checker.js');
  //var Notifier = require('../../lib/dispatch.js');

  app.on('started', function(){

    setInterval(function (data){
      data.find({
        where: {
          checkedAt: {
            lt: new Date(Date.now() - 6000)
          }
        }
      }
      , function (err, datatime){

        checker.areAlive(datatime);

      });
    }
    , 3000
    , sensors
    );

    function dispatch(sensor) {
      require('../../lib/events')(sensor, app);
      require('../../plugins/send-mail')(sensor, app);
      //require('../../lib/notifications')(sensor, app);
      //require('../../lib/notifications-sms')(sensor, app);
    }

    sensors.on('sensor:NOK', dispatch);
    sensors.on('sensor:OK', dispatch);
    checker.on('sensor:Missing', dispatch);

  });
  cb(null);
};
