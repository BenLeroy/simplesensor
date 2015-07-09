'use strict';

module.exports = function outageCheck(event, app) {

	var outages = app.models.Outage;

  outages.find({
    where: {probeId: event.sensorId}
    , limit: 1
    , order: 'start DESC'
  }
  , function (err, obj) {
    if (obj.length > 0) {

      if (obj[0].end === null) {

        obj[0].end = (event.loggedAt).getTime();
        obj[0].duration = (event.loggedAt).getTime() - obj[0].start;
        obj[0].save();
        checkAv(obj[0], app);
      }
    }
  }
  );

  if (event.status !== 'OK' && event.status !== 'OFF') {

    outages.create({
      probeId: event.sensorId
      , start: event.loggedAt
      , lastStatus: event.status
    });
  }
};

function checkAv (data, app) {
  require('./availability')(data, app);
}
