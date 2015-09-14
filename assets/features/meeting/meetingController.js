angular.module('SocketToMe.meeting').controller('MeetingController', ['$scope', function ($scope) {

  $scope.newResponse = {};

  $scope.sendResponse = function() {
    io.socket.post('/response', $scope.newResponse, function () {});
  };

}]);
