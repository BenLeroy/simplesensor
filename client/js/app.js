'use strict';

(function() {

  var app = angular.module('sensorList'
                          , ['lbServices'
                          , 'ui.router']
                          );

  app.config(
      ['$stateProvider'
      , '$urlRouterProvider'
      , function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('index', {
          url: '/down'
          , templateUrl: 'views/down.html'
          , controller: 'ListCtrl'
        })
        .state('list', {
          url: '/list'
          , templateUrl: 'views/list.html'
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
          url: '/sensor/events/:id'
          , templateUrl: 'views/events.html'
          , controller: 'EventCtrl'
        });
        $urlRouterProvider.otherwise('/down');
  }])

  .controller('CountCtrl'
    , function (Sensor, $scope) {

      $scope.CountUp = 0
        , $scope.CountDown = 0
        , $scope.CountFlap = 0;

      Sensor.count({where: {status: "Up"}}).$promise.then(function (data) {

        $scope.CountUp = data.count;

      });

      Sensor.count({where: {status: "Down"}}).$promise.then(function (data) {

        $scope.CountDown = data.count;

      });

      Sensor.count({where: {status: "Flapping"}}).$promise.then(function (data) {

        $scope.CountFlap = data.count;

      });
  })

  .controller('ListCtrl'
    , function (Sensor){

      var that = this;

      that.sensors = [];

      Sensor.find().$promise.then(function (data){

        that.sensors = data;

      });
    })

  .controller('EditCtrl'
    , function (Sensor, $stateParams, $scope) {
      var that = this;
      Sensor.findById({id: $stateParams.id}
        , function (data) {
          that.sensor = data;
        });
      $scope.SaveMod = function () {
        that.sensor.lastmodified = Date.now();
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

  .controller('EventCtrl', function (Sensor, $stateParams) {
    var that = this;
    Sensor.findById({id: $stateParams.id}
        , function (data) {
          that.sensor = data;
        });
  });

})();
