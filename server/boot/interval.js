module.exports = function(app, cb) {

  var sensors = app.models.Sensor;
  var events = app.models.Event;

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

    Checker.on('sensor:down', function (key){
      events.create({sensorId: key.id, status: key.status, loggedAt: Date.now(), upTime: 0}, function (err, created) {
        console.log('event logged');
      });
    });
    Checker.on('sensor:up', function (key){
      events.create({sensorId: key.id, status: key.status, loggedAt: Date.now(), upTime: 0}, function (err, created) {
        console.log('event logged');
      });
    });
    Checker.on('sensor:missed', function (key){
      events.create({sensorId: key.id, status: key.status, loggedAt: Date.now(), upTime: 0}, function (err, created) {
        console.log('event logged');
      });
    });

    //sensors.find(function (era, sensei) {

      //sensei.forEach(function (timecheck) {
        //var timed = Date.now() - timecheck.lastchecked.getTime() + timecheck.frequency * 1000;

        //console.log('timed');
        //console.log(timed);

        //if (timed >= timecheck.frequency * 1000 /* + timecheck.lag */) {
          //console.log('houston we have a problem');
        //}

        //checker = (timecheck.lastchecked.getTime() + timed);
        //checker = new Date(checker);
        //console.log('checker');
        //console.log(checker);

      //});
    //});

    /*sensors.find(function (err, data){

      data.forEach(function (sensor){
        setInterval(
          function(s, test) {
            test.findById(s.id, function (ert, tested){
              console.log(tested.name + ' ' + tested.status);
              if(Date.now() > tested.lastchecked.getTime() + tested.frequency * 1000) {
                tested.status = "Down";
                tested.lastmodified = Date.now();
                tested.lastchecked = Date.now();
                tested.save();

                console.log(tested.name + ' ' + tested.status);
              }
            });
          }
          , sensor.frequency * 1000
          , sensor
          , sensors
        );
      });
    });*/
  });
  cb(null);
};
