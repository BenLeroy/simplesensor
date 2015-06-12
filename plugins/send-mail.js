var dsConfig = require('../server/datasources.json');

module.exports = function(content, app) {
  var yourEmailAddress = process.env.MAIL_ALERT;

  if (yourEmailAddress !== "") {

    app.models.Email.send({
      to: yourEmailAddress
      , from: "noreply@denaroo.com"
      , subject: 'Changements d\'états pour le dernier interval'
      , text: content
    }
    , function(err) {
      if (err) throw err;
        console.log('> email sent successfully');
    });  
  }
  else {
    console.log('No email sent since mail adress (ENV MAIL_ALERT) is not set');
  }
};
