'use strict';
module.exports = function(app, cb) {

  var sensors = app.models.Sensor;

  var amqp = require('amqplib/callback_api');

  app.on('started', function(){

    function newSensorEvent(probe) {
      amqp.connect(
        'amqp://' + process.env.RABBIT_URL
        , function(conErr, conn) {
          if (conErr) {throw conErr}
          conn.createChannel(function(chErr, ch) {
            if (chErr) {throw chErr}
            var ex = 'SIMPLESENSOR';
            var msg = JSON.stringify(probe);

            ch.assertExchange(ex, 'direct', {durable: false});
            ch.publish(ex, 'NEW_SENSORS', new Buffer(msg));
            console.log(" [x] Sent updated data to dashboard");
          });
        }
      );
    }
    if (process.env.RABBIT_URL) {
      sensors.on('sensor:NOK'     , newSensorEvent);
      sensors.on('sensor:OK'      , newSensorEvent);
      sensors.on('sensor:Missing' , newSensorEvent);
    }

  });
  cb(null);
};
