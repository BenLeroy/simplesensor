var dsConfig = require('../server/datasources.json');

module.exports = function(sensor, app) {
  var yourEmailAddress = dsConfig.mailer.transports[0].auth.user;

  app.models.Email.send({
    to: yourEmailAddress
    , from: yourEmailAddress
    , subject: 'Changement d\'état pour la sonde ' + sensor.key
    , html: sensor.key + " is now " + sensor.status + " since " + new Date()
    , generateTextFromHTML: true
  }
  , function(err) {
    if (err) throw err;
    console.log('> email sent successfully');
  });
};
