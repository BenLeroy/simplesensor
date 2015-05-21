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

        $stateProvider.state('list', {
          url: '/'
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
        });
        $urlRouterProvider.otherwise('/');
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

      var List = this;

      List.sensors = [];

      Sensor.find().$promise.then(function (data){

        List.sensors = data;
      });
    })

  .controller('EditCtrl'
    , function (Sensor, $stateParams, $scope) {

      var Edit = this;

      Sensor.findById({id: $stateParams.id}
        , function (data) {

        Edit.sensor = data;

      });

      $scope.SaveMod = function () {

        Edit.sensor.lastmodified = Date.now();
        Edit.sensor.$save();
      };

    })

  .controller('DelCtrl'
    , function (Sensor, $stateParams, $scope, $location) {

      var Del = this;

      Sensor.findById({id: $stateParams.id}
        , function (data) {

        Del.sensor = data;
      });

      $scope.deleteSensor = function () {

        Del.sensor.$delete(null, $location.path('/list'));
      };
    })

  .controller('AddCtrl'
    , function (Sensor, $scope, $location) {

      $scope.newSensor = function(){

        Sensor.create($scope.sensor, function () {
          $location.path('/list');
        });
      };
    });


})();
