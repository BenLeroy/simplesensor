/*'use strict';

var server = require('../server');
var dataSource = server.dataSources.db;
var Probe = server.models.sensor;
var probes = [
  {
    "name": "Probe1"
    , "key": "abcdef"
    , "status": "OK"
    , "createdAt": new Date()
    , "modifiedAt": new Date()
    , "checkedAt": new Date()
    , "frequency": 5
    , "lag": 5000
    , "mailNotif": true
  }
 , {
    "name": "Probe2"
    , "key": "ghijkl"
    , "status": "NOK"
    , "createdAt": new Date()
    , "modifiedAt": new Date()
    , "checkedAt": new Date()
    , "frequency": 12
    , "mailNotif": false
    , "lag": 4500
  }
  , {
    "name": "Sensor"
    , "key": "mnopqr"
    , "status": "Missing"
    , "createdAt": new Date()
    , "modifiedAt": new Date()
    , "checkedAt": new Date()
    , "frequency": 20
    , "lag": 4000
  }
];


var count = probes.length;
dataSource.automigrate('sensor', function (er) {
  if (er) {throw er; }
  probes.forEach(function (probe) {
    Probe.create(probe, function (err, result) {
      if (err) {return; }
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
      }
    });
  });
});*/