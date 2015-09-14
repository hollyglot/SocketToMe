/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
angular.module('SocketToMe', [
  'SocketToMe.chat'
])

.config(['$urlRouterProvider', function ($urlRouterProvider) {

  if (!window.__minimal && !window.__anonymous)
    $urlRouterProvider.otherwise('/chat');

}])

.controller('AppCtrl', function() {});

