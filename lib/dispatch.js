module.exports = function(app, cb) {

  var sensors = app.models.Sensor;
  var events = app.models.Event;
  var notifs = app.models.Notification;

  var pNumber = "+33684618540";
  var eMail = "benderd3v@gmail.com";

  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  var Checker = require('./passive-checker.js');

  sensors.on('sensor:NOK', function (key) {
    notifs.create({
      sensorId: key.id
      , phone: key.phoneTo
      , mail: key.mailTo
    }
    , function (err, noted) {
      console.log('notif sent to : ' + key.phoneTo
                  + ' and ' + key.mailTo
                  + ' for ' + key.name
                  + ' with state ' + key.status
                  );
    });
  });
  sensors.on('sensor:OK', function (key) {
    
  });
  Checker.on('sensor:Missing', function (key) {
    notifs.create({
      sensorId: key.id
      , phone: key.phoneTo
      , mail: key.mailTo
    }
    , function (err, noted) {
      console.log('notif sent to : ' + key.phoneTo
                  + ' and ' + key.mailTo
                  + ' for ' + key.name
                  + ' with state ' + key.status
                  );
    });
  });
  cb(null);
};
