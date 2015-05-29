module.exports = function(Sensor) {

	Sensor.newSensor = function (key, status, cb) {

		if(key === undefined | key === "") {
			return cb('Key cannot be blank');
		}

		Sensor.findOrCreate(
			{ where: {key: key}}
			, {key: key
			, name: key + ' non configuré'
			, status: status
			, createdAt: Date.now()
			, frequency: 60}
			, function (err, instance){

			Sensor.upsert(instance, function (err, obj) {
				obj.status = status;
				obj.modifiedAt = Date.now();
				obj.checkedAt = Date.now();
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
