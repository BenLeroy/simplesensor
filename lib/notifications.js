module.exports = function notifications(sensor, app) {

	var notifs = app.models.Notification;

	notifs.create({
        probeId: sensor.id
        , nContent: 'Sensor ' + sensor.name + ' is notified as ' + sensor.status
        , sendDate: Date.now()
      }
      , function (err, noted) {
        console.log(noted.nContent);
      });
};
