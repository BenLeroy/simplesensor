module.exports = function(app, cb) {

  var sensors = app.models.Sensor;
  var events = app.models.Event;
  var notifs = app.models.Notification;

  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  var Checker = require('../../lib/passive-checker.js');

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

        Checker.areAlive(datatime);

      });
    }
    , 3000
    , sensors
    );

    sensors.on('sensor:NOK', function (key) {
      events.create({
        sensorId: key.id
        , status: key.status
        , loggedAt: Date.now()
        , upTime: 0
      }
      , function (err, created) {
        console.log('event ' + key.status + ' logged');
      });
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
      events.create({
        sensorId: key.id
        , status: key.status
        , loggedAt: Date.now()
        , upTime: 0
      }
      , function (err, created) {
        console.log('event ' + key.status + ' logged');
      });
    });
    Checker.on('sensor:Missing', function (key) {
      events.create({
        sensorId: key.id
        , status: key.status
        , loggedAt: Date.now()
        , upTime: 0
      }
      , function (err, created) {
        console.log('event ' + key.status + ' logged');
      });
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
  });
  cb(null);
};
