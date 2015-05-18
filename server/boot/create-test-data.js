'use strict';

var server = require('../server');
var dataSource = server.dataSources.db;
var Probe = server.models.sensor;
var probes = [
  {
    "name": "Probe1"
    , "key": "abcdef"
    , "status": "Online"
    , "created": "2015-05-10T13:24:20"
    , "lastmodified": new Date()
    , "comments": "I'm the first probe!"
    , "id": 1
  }
 , {
    "name": "Probe2"
    , "key": "ghijkl"
    , "status": "Offline"
    , "created": "2015-01-10T23:02:05"
    , "lastmodified": "2015-02-10T23:02:05"
    , "comments": "I'm an offline probe"
    , "id": 2
  }
  , {
    "name": "Sensor"
    , "key": "mnopqr"
    , "status": "Online"
    , "created": "2014-12-17T03:24:00"
    , "lastmodified": new Date()
    , "comments": "I'll not give you informations"
    , "id": 3
  }
];

var count = probes.length;
dataSource.automigrate('sensor', function(er) {
  if (er) {throw er; }
  probes.forEach(function (probe) {
    Probe.create(probe, function (err, result) {
      if (err) {return; }
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});