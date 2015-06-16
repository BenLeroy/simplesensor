'use strict';

angular.module('controllers', [])

  .controller('CountCtrl', function (Sensor, socket, $scope, $timeout) {

      $scope.count = [];
      $scope.count['OK'] = 0;
      $scope.count['NOK'] = 0;
      $scope.count['Missing'] = 0;

      var stack = [];
      var show = false;

      $scope.showEvents = false;
      $scope.newEvents = "";

      function countStatus (status) {

        Sensor.count({where: {status: status}}).$promise.then(function (data) {
          $scope.count[status] = data.count;
        });
      }

      socket.on('newEvent', function (object) {

        stack.push(object);

        $scope.showEvents = true;
        $scope.newEvents = stack.length + " new events since ";

        if (!show) {
          show = true;
          $scope.highDate = new Date(stack[0].loggedAt).getTime();
          $scope.eventTime = new Date(stack[0].loggedAt);
          $timeout.cancel(stopDisp);
        }

        countStatus("OK");
        countStatus("NOK");
        countStatus("Missing");

        if ($scope.showEvents) {
          var stopDisp = $timeout(function (){
            stack = [];
            show = false;
            $scope.showEvents = false;
            $scope.newEvents = "";
          }
          , 15000
          );
        }
      });

      countStatus("OK");
      countStatus("NOK");
      countStatus("Missing");

  })

  .controller('ListCtrl', function (Sensor, $scope, $stateParams, $filter){

    $scope.sensors = [];
    $scope.filteredItems = [];

    var counter = 0;
    var anyMore = true;

    $scope.moreSensors = function(){

      var filtering = { filter: {limit: 50, offset: counter, order: 'status ASC'}};

      if (typeof $stateParams.status === 'string') {
        $stateParams.status = [$stateParams.status];
      }

      if (typeof $stateParams.status === 'object') {
       filtering.filter.where = {status: {inq: $stateParams.status}};
      }

      $scope.loading = true;

      Sensor.find(filtering).$promise.then(function (data){

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

    var searchMatch = function (haystack, needle) {
      if (!needle) {
        return true;
      }
      return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    $scope.search = function () {
      $scope.filteredItems = $filter('filter')($scope.filteredItems, function (item) {
        for(var attr in item) {
          if (searchMatch(item[attr], $scope.searchText)) {
            return true;
          }
        }
        return false;
      });
      $scope.sensors = $scope.filteredItems;
    };
  })

  .controller('EditCtrl', function (Sensor, $stateParams, $scope, $state) {

      Sensor.find({
        filter: {
          include: 'events'
          , where: {id: $stateParams.id}
        }
      }).$promise.then(function (data) {
        $scope.sensor = data[0];
      });

      $scope.SaveMod = function () {
        $scope.sensor.modifiedAt = Date.now();
        $scope.sensor.$save();
      };

      $scope.delAlert = function () {
        if(confirm('Are you sure you want to delete this sensor?') === true) {
          $scope.deleteSensor();
        }
      };

      $scope.deleteSensor = function () {
        $scope.sensor.$delete({id: $scope.sensor.id}, $state.go('index'));
      };
    })

  .controller('EventCtrl', function (Event, $timeout, $scope, $stateParams, socket){

      $scope.events = [];
      var counter = 0;
      var needMore = true;

      socket.on('newEvent', function (obj){

        Event.find({
          filter: {
            include: 'sensor'
            , where: {id: obj.id}
            , order: 'loggedAt DESC'
          }
        }).$promise.then(function (object) {

          object.map(function (value) {

            value.isNew = true;
            $scope.events.unshift(value);

            $timeout(function () {
              value.isNew = false;
            }
            , 15000
            );
          });
        });
      });

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

              if (new Date($scope.events[i].loggedAt).getTime() >= +$stateParams.date && $stateParams.date !== null) {
                $scope.events[i].isNew = true;

                $timeout(function () {
                  $scope.events[i].isNew = false;
                  }
                  ,20000
                );
              }
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
