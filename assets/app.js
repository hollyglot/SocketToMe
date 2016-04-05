/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
angular.module('SocketToMe', [
  'SocketToMe.join',
  'SocketToMe.moderate',
  'SocketToMe.participate',
  'bethel.sailsSocket',
  'ngSanitize',
  'ngCsv'
])

.config(['$urlRouterProvider', function ($urlRouterProvider) {

  if (!window.__minimal && !window.__anonymous)
    $urlRouterProvider.otherwise('/join');

}])

.controller('AppCtrl', function() {})

.service('Utilities', function() {

  /**
   * zip() This function returns an array of tuples, where the i-th tuple
   * contains the i-th element from each of the argument sequences or iterables.
   * The returned array is extended in length to the length of the longest
   * argument sequence with empty indices being represented as undefined.
   *
   * @param {Array} args
   * @return {Array} array
   */

  this.zip = function () {
    var args = [].slice.call(arguments);
    var longest = args.reduce(function(a,b){
      return a.length>b.length ? a : b
    }, []);

    return longest.map(function(_,i){
      return args.map(function(array){return array[i]})
    });
  }

  /**
   * prepend() Add an item to the beginning of an array.
   *
   * @param {*} value
   * @param {Array} array
   * @return {Array} array
   */
  this.prepend = function (value, array) {
    var newArray = array.slice(0);
    newArray.unshift(value);
    return newArray;
  }
})



