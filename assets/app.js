/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
angular.module('SocketToMe', [
  'SocketToMe.join',
  'SocketToMe.moderate',
  'SocketToMe.participate',
  'bethel.sailsSocket'
])

.config(['$urlRouterProvider', function ($urlRouterProvider) {

  if (!window.__minimal && !window.__anonymous)
    $urlRouterProvider.otherwise('/join');

}])

.controller('AppCtrl', function() {});

