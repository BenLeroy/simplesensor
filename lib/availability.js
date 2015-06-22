'use strict';

var moment = require('moment');

module.exports = function availability (outage, app) {

  var sensor = app.models.Sensor;
  var dateDebut = moment(outage.start);
  var dateFin = moment(outage.end);

  sensor.find({where: {id: outage.probeId}}, function (error, data) {
    data[0].downtime = data[0].downtime + dateFin.diff(dateDebut);
    data[0].save();
  });
};
