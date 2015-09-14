angular.module('SocketToMe.meeting').controller('MeetingController', ['$scope', function ($scope) {

  $scope.response = {};

  $scope.sendResponse = function() {
    io.socket.post('/response', $scope.response, function () {});
  };

}]);
