angular.module('SocketToMe.moderate', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('moderateSetup', {
      url: '/moderate/setup/:meetingName',
      templateUrl: 'features/moderate/moderateSetupView.html',
      controller: 'ModerateController'
    })
    .state('moderateRun', {
      url: '/moderate/run/:meetingName',
      templateUrl: 'features/moderate/moderateRunView.html',
      controller: 'ModerateController'
    });

}]);
