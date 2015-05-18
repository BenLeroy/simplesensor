module.exports = function(Sensor) {

	Sensor.greet = function(msg, cb) {
		cb(null, 'Greetings... ' + msg);
	};

	Sensor.newSensor = function (id, key, name, status, cb) {
		Sensor.findOrCreate({where: {id:id}}, {id:12, key:'testkey', name:'testname', status:'Offline'}, function (err, instance){
			console.log(err);
			if(err){
				Sensor.upsert(instance, function (err, obj) {
					console.log('instance : ' + instance);
					console.log('err : ' + err);
					console.log('obj : ' +obj);
					instance.key = 'testkeyagain';
					instance.name = 'testnameagain';
					instance.status = 'Online';
					console.log(instance);
				});
			}
		});
		cb(
			null
			, 'Ajout de la sonde avec l\'id : ' + id + ', avec la key : ' + key + ', ayant le nom : ' + name + ', avec le status : ' + status);
	};

	Sensor.remoteMethod('greet',
		{
			accepts: {arg: 'msg', type: 'string'},
			returns: {arg: 'greeting', type: 'string'},
			http: {path: '/greet', verb: 'get'}
		}
	);
	Sensor.remoteMethod('newSensor',
		{
			accepts: [
				{arg: 'id', type: 'string'}
				, {arg: 'key', type: 'string'}
				, {arg: 'name', type: 'string'}
				, {arg: 'status', type: 'string'}
				],
			returns: {arg: 'nouvelle sonde', type: 'string'},
			http: {path: '/newSensor'}
		}
	);
};
