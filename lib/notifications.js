module.exports = function notifications(sensor, app) {

	.create({
        probeId: sensor.id
        , nContent: 'Sensor ' + sensor.name
					+ ' is notified as ' + sensor.status
					+ ' since ' + new Date()
        , sendDate: Date.now()
      }
      , function (err, noted) {
		sendmail(noted);
      });

	function sendmail(notif) {
		require('../plugins/send-mail')(notif, sensor, app);
	}
};
