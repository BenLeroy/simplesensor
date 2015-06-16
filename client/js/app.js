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

        $stateProvider
          .state('index', {
            url: '/list/?:status'
            , templateUrl: 'views/list.html'
            , controller: 'ListCtrl'
          })
          .state('sensorEdit', {
            url: '/sensor/edit/:id'
            , templateUrl: 'views/edit.html'
            , controller: 'EditCtrl'
          })
          .state('events', {
            url: '/events/?:date'
            , templateUrl: 'views/events.html'
            , controller: 'EventCtrl'
          })
          .state('consult', {
            url: '/sensor/consult/:id'
            , templateUrl: 'views/consult.html'
            , controller: 'EditCtrl'
          });
        $urlRouterProvider.otherwise('/list/');
  }])


  .factory('socket', function ($rootScope) {

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
})

  // Needed to link search between controllers
  .run(function ($state, $rootScope) {
    $rootScope.$state = $state;
  });

})();
