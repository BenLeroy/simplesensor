module.exports = function(app, cb) {

  var sensors = app.models.Sensor;

  app.on('started', function(){

    sensors.find(function (era, sensei) {

      sensei.forEach(function (timecheck) {
        var timed = Date.now() - timecheck.lastchecked.getTime() + timecheck.frequency * 1000;

        console.log(timed);

        if (timed >= timecheck.frequency * 1000 /* + timecheck.lag */) {
          console.log('houston we have a problem');
        }

        /*sensors.find({
          where: {
            lastchecked: { 
              lt: timed
            }
          }
        }
        , function (err, datatime){
          console.log(datatime);
        });*/
      });
    });

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
