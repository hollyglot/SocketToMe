angular.module('SocketToMe.join', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('join', {
      url: '/join',
      templateUrl: 'features/join/joinView.html',
      controller: 'JoinController'
    });

}]);
