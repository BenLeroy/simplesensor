'use strict';
var os = require('os');

module.exports = function DBchecker (username, cb) {

  var error;

  if(username === undefined) {
    error = ('You must define your MySQL username and password! '+ os.EOL + 'Please run with `DB_USER=[username] DB_PASSWORD=[password]`.');
  }
  cb(error);
};
