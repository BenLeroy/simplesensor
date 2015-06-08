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
  }]);

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
