var dsConfig = require('../server/datasources.json');

module.exports = function(content, app) {

  if (process.env.MAIL_ALERT) {

    app.models.Email.send({
      to: process.env.MAIL_ALERT
      , from: "noreply@denaroo.com"
      , subject: 'Changements d\'états pour le dernier interval'
      , text: content
    }
    , function(err) {
      if (err) {
        throw err;
      }

      console.log('> email sent successfully');
    });
  }
  else {
    console.log('No email sent since mail adress (ENV MAIL_ALERT) is not set');
  }
};
