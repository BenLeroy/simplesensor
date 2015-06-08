'use strict';

(function() {

  var app = angular.module('sensorList'
                          , ['lbServices'
                          , 'scroll'
                          , 'ui.router'
                          , 'controllers']
                          );

  app.config(
      ['$stateProvider'
      , '$urlRouterProvider'
      , function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('index', {
          url: '/list'
          , templateUrl: 'views/list.html'
          , controller: 'ListCtrl'
        })
        .state('down', {
          url: '/down'
          , templateUrl: 'views/down.html'
          , controller: 'ListCtrl'
        })
        .state('sensorEdit', {
          url: '/sensor/edit/:id'
          , templateUrl: 'views/edit.html'
          , controller: 'EditCtrl'
        })
        .state('sensorDel', {
          url: '/sensor/del/:id'
          , templateUrl: 'views/delete.html'
          , controller: 'DelCtrl'
        })
        .state('sensorNew', {
          url: '/sensor/add'
          , templateUrl: 'views/add.html'
          , controller: 'AddCtrl'
        })
        .state('events', {
          url: '/events/'
          , templateUrl: 'views/events.html'
          , controller: 'EventCtrl'
        })
        .state('consult', {
          url: '/sensor/consult/:id'
          , templateUrl: 'views/consult.html'
          , controller: 'EditCtrl'
        })
        .state('notifs', {
          url: '/notifs'
          , templateUrl: 'views/notifs.html'
          , controller: 'NotifCtrl'
        });
        $urlRouterProvider.otherwise('/list');
  }])

  /*.controller('CountCtrl'
    , function (Sensor, socket, $scope) {

      $scope.count = [];
      $scope.count['OK'] = 0;
      $scope.count['NOK'] = 0;
      $scope.count['Missing'] = 0;

      $scope.newEvent = "";

      socket.on('newEvent', function (object) {

        $scope.newEvent = "1 sensor is now " + object.status;
        countStatus("OK");
        countStatus("NOK");
        countStatus("Missing");

       });

      function countStatus (status) {

        Sensor.count({where: {status: status}}).$promise.then(function (data) {
          $scope.count[status] = data.count;
        });
      }

      countStatus("OK");
      countStatus("NOK");
      countStatus("Missing");

      /*setInterval(
        $scope.newEvent = ""
        , 5000
      );
  })

  .controller('ListCtrl'
    , function (Sensor, $scope){

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

  .controller('EditCtrl'
    , function (Sensor, $stateParams, $scope) {
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

  .controller('DelCtrl'
    , function (Sensor, $stateParams, $scope, $location) {

      var that = this;

      Sensor.findById({id: $stateParams.id}
        , function (data) {

        that.sensor = data;
      });

      $scope.deleteSensor = function () {

        that.sensor.$delete(null, $location.path('/list'));
      };
    })

  .controller('AddCtrl'
    , function (Sensor, $scope, $location) {

      $scope.newSensor = function(){

        Sensor.create($scope.sensor, function () {
          $location.path('/list');
        });
      };
    })

  .controller('EventCtrl'
    , function (Event, $scope){

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
    })*/;

app.factory('socket', function ($rootScope) {
  
  var socket = io.connect();
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});

})();
