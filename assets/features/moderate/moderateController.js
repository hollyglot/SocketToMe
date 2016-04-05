angular.module('SocketToMe.moderate').controller('ModerateController', ['$scope', '$stateParams', '$location', 'Utilities', function ($scope, $stateParams, $location, Utilities) {

  $ctrl = this;
  $scope.questions = [];
  $scope.newQuestion = {};
  $scope.unansweredQuestions = [];
  $scope.questionOrdinal = -1;

  $scope.init = function () {

    io.socket.get('/meeting', {name: $stateParams.meetingName}, function (meeting) {

      if ($scope.$root.modToken !== meeting[0].name + meeting[0].password) {
        $location.path('/join');
      } else {
        $scope.$root.meeting = meeting[0];
      }

      $scope.$apply();
    });

  };

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

      for(var i = 0, len = $scope.questions.length; i < len; i++) {
        if ($scope.questions[i].id == $scope.$root.meeting.currentQuestion.id) {
          $scope.questionOrdinal = i + 1;
        }
      }

    } else {

      io.socket.get('/question', {meeting: $scope.$root.meeting.id, isDone: false}, function (unansweredQuestions) {
        $scope.unansweredQuestions = unansweredQuestions;

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

    $ctrl.getResponses();

  };

  $scope.assembleResponses = function () {
    var responses = Utilities.zip($scope.allResponses.stop, $scope.allResponses.start, $scope.allResponses.cont);
    return Utilities.prepend(["Stop", "Start", "Continue"], responses);
  }

  $ctrl.getResponses = function () {

    $scope.allResponses = {stop: [],  start: [], cont: []};

    io.socket.get('/response', {question: $scope.$root.meeting.currentQuestion.id}, function (allResponses) {

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
  };

  $scope.init();

}]);
