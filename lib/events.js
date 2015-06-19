module.exports = function events(sensor, app) {

	var events = app.models.Event;
  var sensors = app.models.Sensor;

	events.create({
    sensorId: sensor.id
    , status: sensor.status
    , loggedAt: Date.now()
    , upTime: 0
  }
  , function (err, created) {

    createOutage(created, app);

    sensors.findOne({where: {id: created.sensorId}}, function (err, mailable) {
      if (mailable.mailNotif) {
        compteur(created, app);
      }
      else {
        app.io.emit('newEvent', created);
      }
    });
  });
};

function compteur (data, app) {
  require('./stacker-mail')(data, app);
}

function createOutage (obj, app) {
  require('./outages')(obj, app);
}
