angular.module('SocketToMe.meeting', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('meeting', {
      url: '/meeting',
      templateUrl: 'features/meeting/meetingView.html',
      controller: 'MeetingController'
    });

}]);
