angular.module('SocketToMe.participate').controller('ParticipateController', ['$scope', '$stateParams', '$location', 'sailsSocket', function ($scope, $stateParams, $location, sailsSocket) {

  $ctrl = this;
  $scope.newResponse = {};

  $ctrl.init = function () {

    $scope.allResponses = {stop: [],  start: [], cont: []};
    $scope.createdResponses = {stop: [], start: [], cont: []};

    sailsSocket.get('/meeting?name=' + $stateParams.meetingName).then(function (meeting) {

      $scope.meeting = meeting[0];

      if ($scope.meeting.currentQuestion) {

        io.socket.get('/response', {question: $scope.meeting.currentQuestion.id}, function (allResponses) {
          console.log('all ', allResponses);

          allResponses.forEach(function (response) {
            if (response.type === 'stop') {
              $scope.allResponses.stop.push(response.description);
            } else if (response.type === 'start') {
              $scope.allResponses.start.push(response.description);
            } else {
              $scope.allResponses.cont.push(response.description);
            }
          });

          $scope.$apply();

        });

      }

    });
  }

  io.socket.on('meeting', function (meetingChanged) {
    console.log('something changed ', meetingChanged);
    $ctrl.init();
  })

  $scope.sendResponse = function() {
    $scope.newResponse.question = $scope.meeting.currentQuestion.id;
    io.socket.post('/response', $scope.newResponse, function (created) {
      console.log(created);
      $scope.newResponse = {};
      if (created.type === 'stop') {
        $scope.createdResponses.stop.push(created.description);
      } else if (created.type === 'start') {
        $scope.createdResponses.start.push(created.description);
      } else {
        $scope.createdResponses.cont.push(created.description);
      }
      console.log($scope.createdResponses);
      $scope.$apply();
    });
  };

  $ctrl.init()

}]);
