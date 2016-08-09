module.exports = function(Sensor) {

  Sensor.inCheck = function (key, status, cb) {

    var haveChanged = false;

    if(key === undefined || key === "") {
      return cb('Key cannot be blank');
    }

    Sensor.findOrCreate({where: {key: key}}
      , {key: key
      , name: key
      , status: status
      , createdAt: Date.now()
      , frequency: 60
      , lag: 1500}
      , function (err, instance){

        Sensor.upsert(instance, function (err, obj) {

          if (err) {
            console.log("Unable to update sensor ", err);
          }

          obj.modifiedAt = Date.now();
          obj.checkedAt = Date.now();

          if (instance.__data.status !== status) {
            obj.status = status;
            haveChanged = true;
          }
          obj.save({}, function (ert, objt) {
            if (haveChanged) {
              Sensor.emit('sensor:' + status, obj);
            }
            cb(
              null
              , objt
            );
          });
        });
      }
    );
  };

  Sensor.remoteMethod('inCheck',
    {
      accepts: [
        {arg: 'key', type: 'string'}
        , {arg: 'status', type: 'string'}
        ],
      returns: {arg: 'sensor', type: 'object'},
      http: {path: '/inCheck'},
      description: "Update existing model instance or insert a new one if it doesn't exist"

    }
  );
};
