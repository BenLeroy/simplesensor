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
        compteur(created);

        //app.io.emit('newEvent', created);
      }
  );
};

var i = 0;
var stacked = [];
var isRunning = false;

function compteur (data) {
  i++;
  console.log(i);
  if (isRunning === false) {
    stacked.push(data);
    setInterval(function (obj) {

      if(stacked.length === 5) {
        //app.io.emit('newEvent', stacked);
        console.log(stacked);
        isRunning = true;
      }
    }
    , 3000
    , data
    );
  isRunning = true;

  }
}
