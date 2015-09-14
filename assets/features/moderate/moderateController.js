angular.module('SocketToMe.moderate').controller('ModerateController', ['$scope', '$stateParams', '$location', function ($scope, $stateParams, $location) {

  $scope.questions = [];
  $scope.newQuestion = {};

  $scope.init = function () {

    io.socket.get('/meeting', {name: $stateParams.meetingName}, function (meeting) {
      if ($scope.$root.modToken !== meeting[0].name + meeting[0].password) {
        $location.path('/join');
      } else {
        $scope.$root.meeting = meeting[0];
      }
      $scope.$apply();
    });

  }

  $scope.$root.$watch('meeting', function (newValue) {
    if (!newValue) return;

    console.log('meeting ', newValue);

    io.socket.get('/question', {meeting: newValue.id}, function (foundQuestions) {
      console.log('found question ', foundQuestions);
      $scope.questions = foundQuestions;
      $scope.$apply();
    });
  });

  $scope.createQuestion = function () {

    $scope.newQuestion.meeting = $scope.$root.meeting.id;

    console.log('question to create ', $scope.newQuestion);
    io.socket.post('/question', $scope.newQuestion, function (createdQuestion) {

      console.log('createdQuestion ', createdQuestion);

      if (createdQuestion) {
        $scope.questions.push(createdQuestion);
        $scope.$apply();
      }

    });
  }

  $scope.init();

}]);
