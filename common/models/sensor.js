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
			, created: Date.now()
			, frequency: 60}
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

	Sensor.events = function (id, cb) {
		Sensor.findById(id, function (err, instance) {

			Sensor.upsert(instance, function (ert, obj) {
				obj.lastmodified = Date.now();
				obj.history.push(
					{"status" : obj.status, "dernière modif": obj.lastmodified
					}
				);
				console.log(obj);
				obj.save ({}, function (erc, objj) {
					cb(null, objj);
				});
			});
		});
	};

	Sensor.remoteMethod('events',
		{
			accepts: {arg: 'id', type: 'string'},
			returns: {arg: 'ça donne', type: 'object'},
			http: {path: '/events'}
		}
	);
};
