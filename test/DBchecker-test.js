'use strict';

var assert = require('assert');
var checker = require('../server/server.DB-checker');

describe('Database auth check', function () {
  it('should send error if no args are sent', function (done) {
    checker(undefined, function (err) {
      assert(err);
      done();
    });
  });

  it('should send no error if arg is sent', function (done) {
    checker('bla', function (err) {
      assert.deepEqual(err, undefined);
      done();
    });
  });
});
