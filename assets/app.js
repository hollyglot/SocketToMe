/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
angular.module('SocketToMe', [
  'SocketToMe.join',
  'SocketToMe.meeting'
])

.config(['$urlRouterProvider', 'ngCookies', function ($urlRouterProvider, ngCookies) {

  if (!window.__minimal && !window.__anonymous)
    $urlRouterProvider.otherwise('/join');

}])

.controller('AppCtrl', function() {});

