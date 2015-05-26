module.exports = function(app, cb) {

  var sensors = app.models.Sensor;
  app.on('started', function(){
    sensors.find(function (err, data){

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
    });
  });
  cb(null);
};
