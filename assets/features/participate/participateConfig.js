angular.module('SocketToMe.participate', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('participate', {
      url: '/participate/:meetingName',
      templateUrl: 'features/participate/participateView.html',
      controller: 'ParticipateController'
    });

}]);
