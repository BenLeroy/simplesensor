'use strict';

angular.module('controllers', [])

  .controller('CountCtrl', function (Sensor, socket, $scope) {

      $scope.count = [];
      $scope.count['OK'] = 0;
      $scope.count['NOK'] = 0;
      $scope.count['Missing'] = 0;

      $scope.newEvent = "";

      function countStatus (status) {

        Sensor.count({where: {status: status}}).$promise.then(function (data) {
          $scope.count[status] = data.count;
        });
      }

      socket.on('newEvent', function (object) {

        $scope.newEvent = "1 sensor is now " + object.status;
        countStatus("OK");
        countStatus("NOK");
        countStatus("Missing");

      });

      countStatus("OK");
      countStatus("NOK");
      countStatus("Missing");

      /*setInterval(
        $scope.newEvent = ""
        , 5000
      );*/
  })

  .controller('ListCtrl', function (Sensor, $scope){

      $scope.sensors = [];

      var counter = 0;
      var anyMore = true;

      $scope.moreSensors = function(){

        $scope.loading = true;

        Sensor.find({
          filter: {
            limit: 50
            , offset: counter
            , order: 'status ASC'
          }
        }).$promise.then(function (data){

            for (var i = 0; i < data.length; i++) {
              $scope.sensors.push(data[i]);
            }
            $scope.loading = false;
            counter += 50;
        });
        if (counter > $scope.sensors.length) {
          anyMore = false;
        }
      };
      if (anyMore) {
        $scope.moreSensors();
      }
    })

  .controller('EditCtrl', function (Sensor, $stateParams, $scope) {
      var that = this;
      Sensor.findById({id: $stateParams.id}
        , function (data) {
          that.sensor = data;
        });
      $scope.SaveMod = function () {
        that.sensor.modifiedAt = Date.now();
        that.sensor.$save();
      };
    })

  .controller('DelCtrl', function (Sensor, $stateParams, $scope, $location) {

      var that = this;

      Sensor.findById({id: $stateParams.id}
        , function (data) {

        that.sensor = data;
      });

      $scope.deleteSensor = function () {

        that.sensor.$delete(null, $location.path('/list'));
      };
    })

  .controller('AddCtrl', function (Sensor, $scope, $location) {

      $scope.newSensor = function(){

        Sensor.create($scope.sensor, function () {
          $location.path('/list');
        });
      };
    })

  .controller('EventCtrl', function (Event, $scope){

      $scope.events = [];
      var counter = 0;
      var needMore = true;

      $scope.moreEvents = function(){

        $scope.loading = true;

        Event.find({
          filter: {
            include: 'sensor'
            , limit: 50
            , offset: counter
            , order: 'loggedAt DESC'
          }
        }).$promise.then(function (data){

            for (var i = 0; i < data.length; i++) {
              $scope.events.push(data[i]);
            }
            $scope.loading = false;
            counter += 50;
        });
        if (counter > $scope.events.length) {
          needMore = false;
        }
      };
      if (needMore) {
        $scope.moreEvents();
      }
  });
