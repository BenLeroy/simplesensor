module.exports = function events(sensor, app) {

	var events = app.models.Event;

	events.create({
        sensorId: sensor.id
        , status: sensor.status
        , loggedAt: Date.now()
        , upTime: 0
      }
      , function (err, created) {
        console.log('event ' + sensor.status + ' logged');
        compteur(created, app);

        //app.io.emit('newEvent', created);
      }
  );
};

var i = 0;
var stacked = [];
var isRunning = false;

function compteur (data, app) {
  i++;
  console.log(i);

  if (!isRunning) {
    stacked.push(data);
    if (stacked.length >= 6) {
      clearTimeout(timed);
      app.io.emit('newEvent', stacked);
    }
    var timed = setTimeout(function (obj) {

      if(stacked.length >= 1) {
        app.io.emit('newEvent', stacked);
        console.log(stacked);
        isRunning = true;
        stacked = [];
        i = 0;
      }
      isRunning = false;
    }
    , 5000
    , data
    );
    }
}
