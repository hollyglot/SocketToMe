angular.module('SocketToMe.chat', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('chat', {
      url: '/chat',
      templateUrl: 'features/chatView.html',
      controller: 'ChatController'
    });

}]);
