angular.module('SocketToMe.join').controller('JoinController', ['$scope', '$cookies', function ($scope, $cookies) {

  $ctrl = this;
  $scope.meeting = {};

  $scope.createJoinMeeting = function() {

    // Get meeting by this name to check if it already exists
    // If exists, join meeting, otherwise, create
    io.socket.get('/meeting', $scope.meeting, function (existingMeeting) {
      if (existingMeeting.length) {
        // join the meeting
        console.log('Joining Meeting');
      } else {
        // create the meeting
        $ctrl.createMeeting();
      };
    });
  }

  $ctrl.createMeeting = function() {
    io.socket.post('/meeting', $scope.meeting, function (newMeeting) {
      console.log('Created Meeting ', newMeeting);
    });
  }

}]);
