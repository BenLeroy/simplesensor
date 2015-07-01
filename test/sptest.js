'use strict';
process.env.NODE_ENV = 'test';

var app = require('../server/server.js')
, request = require('supertest');


var DataSource = require('loopback-datasource-juggler').DataSource;
 
var dataSource = new DataSource('memory');



function makekey()
{
    var text = "key_";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var mykey = makekey();
var keydef = new RegExp(mykey);


describe('POST /inCheck', function () {

	it('should add a new sensor to the list', function (done) {
		request(app)
			.post('/api/sensors/inCheck')
			.type('form')
			.send({key: mykey})
			.send({status: 'NOK'})
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(keydef)
			.expect(/NOK/)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});

	it('should retrieve previously created sensor', function (done) {
		request(app)
			.get('/api/sensors/findOne?filter={"where":{"key":"' + mykey + '"}}')
			.expect(keydef)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});

	it('should update new sensor\'s data', function (done) {
		request(app)
			.post('/api/sensors/inCheck')
			.send({key: mykey})
			.send({status: 'OK'})
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(/OK/)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});

	it('should send an error if key arg is not sent', function (done) {
		request(app)
			.post('/api/sensors/inCheck')
			.send({status: 'OK'})
			.expect('Content-Type', /json/)
			.expect(500)
			.expect(/Key cannot be blank/)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});

	it('should send an error if key arg is empty', function (done) {
		request(app)
			.post('/api/sensors/inCheck')
			.send({key: ''})
			.expect('Content-Type', /json/)
			.expect(500)
			.expect(/Key cannot be blank/)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});
});

describe('DELETE /sensors/{id}', function (done) {

	it('should delete new sensor', function (done) {
		request(app)
			.delete('/api/sensors/4')
			.send({id: 4})
			.expect('Content-Type', /json/)
			.expect(204)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});

	it('should confirm that new sensor is deleted', function (done) {
		request(app)
			.get('/api/sensors/4')
			.expect(404)
			.expect(/MODEL_NOT_FOUND/)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});
});

describe('GET /list', function () {

	it('respond with json', function (done){
		request(app)
			.get('/api/sensors')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(/key/)
			.expect(/status/)
			.expect(/name/)
			.end(function (err, res) {
				if(err) return done(err);
				done();
			});
	});
});
