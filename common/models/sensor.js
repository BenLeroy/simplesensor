module.exports = function(Sensor) {

	Sensor.newSensor = function (key, status, cb) {

		Sensor.findOrCreate(
			{ where: {key : key}}
			, {key: key
			, name: key + ' non configuré'
			, status: status
			, created: Date.now()}
			, function (err, instance){

			Sensor.upsert(instance, function (err, obj) {
				obj.status = status;
				obj.lastmodified = Date.now();
				obj.save({}, function (ert, objt) {
					cb(
						null
						, objt
					);
				});
			});
		});
	};

	Sensor.remoteMethod('newSensor',
		{
			accepts: [
				{arg: 'key', type: 'string'}
				, {arg: 'status', type: 'string'}
				],
			returns: {arg: 'sensor', type: 'object'},
			http: {path: '/newSensor'}
		}
	);
};
