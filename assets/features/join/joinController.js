angular.module('SocketToMe.join').controller('JoinController', ['$scope', function ($scope) {

  $ctrl = this;
  $scope.meeting = {};

  $scope.createJoinMeeting = function() {

    io.socket.get('/meeting', $scope.meeting, function (existingMeeting) {
      if (existingMeeting.length) {
        // join the meeting if no password
        if (!$scope.meeting.password || $scope.meeting.password.length === 0) {
          console.log('Joining Meeting As participant');
          $ctrl.joinMeeting();
        } else {
          if (existingMeeting.password === $scope.meeting.password) {
            console.log('Joining Meeting As moderator');
            $scope.$root.modToken = $scope.meeting.name + $scope.meeting.password;
            // Redirect to moderate/meetingName
            console.log('redirecting to moderate');
          } else {
            console.log('error ', 'password dont match');
          }
        }
      } else {
        // create the meeting
        if ($scope.meeting.password && $scope.meeting.password.length > 0) {
          $ctrl.createMeeting();
          console.log('redirecting to moderate');
        } else {
          console.log('errors 1');
        }
      };
    });

  }

  $ctrl.createMeeting = function() {
    io.socket.post('/meeting', $scope.meeting, function (newMeeting) {
      $scope.$root.modToken = $scope.meeting.name + $scope.meeting.password;
      console.log('Created Meeting ', newMeeting);
    });
  }

  $ctrl.joinMeeting = function() {

  }

}]);
