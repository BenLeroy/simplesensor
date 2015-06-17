var loopback = require('loopback');
var boot = require('loopback-boot');
var morgan = require('morgan');

var app = module.exports = loopback();

app.use(morgan('tiny'));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
    if (!process.env.MAIL_ALERT) {
      console.log('No mails will be sent until mail adress is set (env MAIL_ALERT)');
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    //app.start();
    app.io = require('socket.io')(app.start());

  }
});


