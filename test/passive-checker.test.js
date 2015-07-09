'use strict';

var assert = require('assert');
var checker = require('../lib/passive-checker.js');


describe('Passive checker', function () {
	beforeEach(function() {
		checker.removeAllListeners();
	});

	it('send nothing', function (){
		checker.on('sensor:Missing', function () {
			assert.fail('never enter here (missed)');
		});
		checker.on('sensor:OK', function () {
			assert.fail('never enter here (up)');
		});
		checker.on('sensor:NOK', function () {
			assert.fail('never enter here (down)');
		});
		checker.isAlive({
			key: 'abc'
			, status: 'OK'
			, checkedAt: new Date(Date.now() - 5 * 1000)
			, frequency: 60
			, lag: 1000
			, updateAttributes: function(args, callback) {
				return callback(null, {key: 'abc', status: 'Missing'});
			}
		});
	});

	it('send missed event', function (done){
		checker.on('sensor:Missing', function (sensor) {
			assert.equal(sensor.key, 'abc');
			assert.equal(sensor.status, 'Missing');
			done();
		});
		checker.isAlive({
			key: 'abc'
			, status: 'OK'
			, checkedAt: new Date(Date.now() - 3600 * 1000)
			, frequency: 60
			, lag: 1000
			, updateAttributes: function(args, callback) {
				return callback(null, {key: 'abc', status: 'Missing'});
			}
		});
	});

	it('send missed event for sensor list', function (done){
		checker.on('sensor:Missing', function (sensor) {
			assert.equal(sensor.key, 'abc');
			assert.equal(sensor.status, 'Missing');
			done();
		});
		checker.areAlive([{
			key: 'abc'
			, status: 'OK'
			, checkedAt: new Date(Date.now() - 3600 * 1000)
			, frequency: 60
			, lag: 1000
			, updateAttributes: function(args, callback) {
				return callback(null, {key: 'abc', status: 'Missing'});
			}
		}]);
	});

	it('send missed event even if already down', function (done){
		checker.on('sensor:Missing', function (sensor) {
			assert.equal(sensor.key, 'abc');
			assert.equal(sensor.status, 'Missing');
			done();
		});
		checker.isAlive({
			key: 'abc'
			, status: 'NOK'
			, checkedAt: new Date(Date.now() - 3600 * 1000)
			, frequency: 60
			, lag: 1000
			, updateAttributes: function(args, callback) {
				return callback(null, {key: 'abc', status: 'Missing'});
			}
		});
	});
});
