angular.module('SocketToMe.join').controller('JoinController', ['$scope', '$location', function ($scope, $location) {

  $ctrl = this;
  $scope.meeting = {};
  $scope.error = "";

  $scope.createJoinMeeting = function() {

    $scope.error = "";
    if (!$scope.meeting.name || $scope.meeting.name.length === 0) {
      $scope.error = "Please enter a meeting name";
      return;
    }
    io.socket.get('/meeting', {name: $scope.meeting.name}, function (existingMeeting) {
      if (existingMeeting.length) {
        // join the meeting if no password
        if (!$scope.meeting.password || $scope.meeting.password.length === 0) {
          console.log('Joining Meeting As participant');
          $ctrl.joinMeeting();
        } else {
          if (existingMeeting[0].password === $scope.meeting.password) {
            console.log('Joining Meeting As moderator');
            $scope.$root.modToken = $scope.meeting.name + $scope.meeting.password;
            // Redirect to moderate/meetingName
            $location.path('/moderate/setup/' + $scope.meeting.name);
            $scope.$apply();
          } else {
            $scope.error = 'Wrong password provided for this event. If you were trying to create an event, choose a different name.'
            $scope.$apply();
          }
        }
      } else {
        // create the meeting
        if ($scope.meeting.password && $scope.meeting.password.length > 0) {
          $ctrl.createMeeting();
          console.log('redirecting to moderate');
          $location.path('/moderate/setup/' + $scope.meeting.name);
          $scope.$apply();
        } else {
          $scope.error = "No meeting exists with this name, enter a password to create an event."
          $scope.$apply();
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
    $location.path('/participate/' + $scope.meeting.name);
    $scope.$apply();
  }

}]);
