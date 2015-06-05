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
        app.io.emit('newEvent', created);
      });
};
