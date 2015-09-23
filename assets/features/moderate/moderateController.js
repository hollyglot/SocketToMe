angular.module('SocketToMe.moderate').controller('ModerateController', ['$scope', '$stateParams', '$location', 'sailsSocket', function ($scope, $stateParams, $location, sailsSocket) {

  $ctrl = this;
  $scope.questions = [];
  $scope.newQuestion = {};
  $scope.unansweredQuestions = [];
  $scope.timerFinished = false;
  $scope.callbackTimer = {};

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
    io.socket.get('/question', {meeting: newValue.id}, function (foundQuestions) {
      $scope.questions = foundQuestions;
      $scope.$apply();
    });
  });

  $scope.createQuestion = function () {

    $scope.newQuestion.meeting = $scope.$root.meeting.id;

    io.socket.post('/question', $scope.newQuestion, function (createdQuestion) {
      if (createdQuestion) {
        $scope.questions.push(createdQuestion);
        $scope.newQuestion = {};
        $scope.$apply();
      }
    });
  }

  $scope.startMeeting = function () {
    io.socket.put('/meeting/' + $scope.$root.meeting.id, {currentAction: 'respond', currentQuestion: $scope.questions[0].id}, function (updatedMeeting) {
      $scope.$root.meeting.currentAction = updatedMeeting;
      $location.path('/moderate/run/' + $scope.$root.meeting.name);
      $scope.$apply();
    });
  }

  $scope.continue = function () {

    if ($scope.$root.meeting.currentAction === 'respond') {

      io.socket.put('/meeting/' + $scope.$root.meeting.id, {currentAction: 'review'}, function (updatedMeeting) {
        $scope.$root.meeting = updatedMeeting;
        $scope.$apply();
      });

      io.socket.put('/question/' + $scope.$root.meeting.currentQuestion.id, {isDone: true}, function (updatedQuestion) {
        $scope.$root.meeting.currentQuestion = updatedQuestion;
        $scope.$apply();
      });

      // Get all reponses
      $scope.allResponses = {stop: [],  start: [], cont: []};
      $scope.createdResponses = {stop: [], start: [], cont: []};

      sailsSocket.get('/meeting?name=' + $stateParams.meetingName).then(function (meeting) {

        $scope.meeting = meeting[0];

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

      });

    } else {

      io.socket.get('/question', {meeting: $scope.$root.meeting.id, isDone: false}, function (unansweredQuestions) {
        $scope.unansweredQuestions = unansweredQuestions;

        console.log(unansweredQuestions.length, unansweredQuestions);

        if (unansweredQuestions.length) {

          io.socket.put('/meeting/' + $scope.$root.meeting.id, {currentAction: 'respond', currentQuestion: unansweredQuestions[0].id}, function (updatedMeeting) {
            $scope.$root.meeting = updatedMeeting;
            $scope.$apply();
          });

        } else {
          console.log('end of meeting!');
          // This is the last question
        }

      });

    }

  }

  $scope.callbackTimer.finished = function () {
    $scope.timerFinished = true;
    $scope.$apply();
  }

  $scope.init();

}]);
