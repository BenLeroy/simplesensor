'use strict';

var server = require('../server');
var dataSource = server.dataSources.db;
var Probe = server.models.sensor;
var probes = [
  {
    "name": "Probe1"
    , "key": "abcdef"
    , "status": "OK"
    , "createdAt": "2015-05-10T13:24:20"
    , "modifiedAt": new Date()
    , "checkedAt": new Date()
    , "comments": "I'm the first probe!"
    , "frequency": 5
  }
 , {
    "name": "Probe2"
    , "key": "ghijkl"
    , "status": "NOK"
    , "createdAt": "2015-01-10T23:02:05"
    , "modifiedAt": "2015-02-10T23:02:05"
    , "checkedAt": new Date()
    , "comments": "I'm an offline probe"
    , "frequency": 12
  }
  , {
    "name": "Sensor"
    , "key": "mnopqr"
    , "status": "Missing"
    , "createdAt": "2014-12-17T03:24:00"
    , "modifiedAt": new Date()
    , "checkedAt": new Date()
    , "comments": "I'll not give you informations"
    , "frequency": 20
  }
];


var count = probes.length;
dataSource.automigrate('sensor', function (er) {
  if (er) {throw er; }
  probes.forEach(function (probe) {
    Probe.create(probe, function (err, result) {
      //Probe.emit('sensor:' + result.status);
      if (err) {return; }
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
      }
    });
  });
});

