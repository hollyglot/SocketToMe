angular.module('SocketToMe.moderate', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('moderate', {
      url: '/moderate',
      templateUrl: 'features/moderate/moderateView.html',
      controller: 'ModerateController'
    });

}]);
