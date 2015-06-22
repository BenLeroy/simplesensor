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

      if (obj[0].end === undefined) {

        obj[0].end = event.loggedAt;
        obj[0].duration = event.loggedAt - obj[0].start;
        obj[0].save();
        checkAv(obj[0], app);
      }
    }
  }
  );

  if (event.status !== 'OK') {

    outages.create({
      probeId: event.sensorId
      , start: event.loggedAt
      , lastStatus: event.status
    }
    , function (err, data) {});
  }
};

function checkAv (data, app) {
  require('./availability')(data, app);
}
