var dsConfig = require('../server/datasources.json');

module.exports = function(sensor, app) {
  var yourEmailAddress = "loopbacktester@gmail.com";

  app.models.Email.send({
    to: yourEmailAddress
    , from: "noreply@denaroo.com"
    , subject: 'Changement d\'état pour la sonde ' + sensor.key
    , text: sensor.key + " is now " + sensor.status + " since " + new Date()
  }
  , function(err) {
    if (err) throw err;
    console.log('> email sent successfully');
  });
};
