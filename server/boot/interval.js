module.exports = function(app, cb) {

  var sensors = app.models.Sensor;

  app.on('started', function(){

    var checker = setInterval(function (data){
      data.find({
        where: {
          lastchecked: {
            lt: new Date(Date.now() - 6000)
          }
        }
      }
      , function (err, datatime){
        datatime.forEach(function (sensei){
          if(
            Date.now() > sensei.lastchecked.getTime() + sensei.frequency * 1000
             & sensei.status !== 'Down'
          )
          {
            sensei.updateAttributes({status: 'Down', lastmodified: new Date()}
              , function (erb, instance){
                console.log(instance.name + ' is down since ' + instance.lastmodified);
              });
          }
        });
      });
    }
    , 3000
    , sensors
    );

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
