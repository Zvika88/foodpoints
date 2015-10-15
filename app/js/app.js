// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', [
  'ui.router',
  'Profile',
  'Home',
  'lbServices',
  'ngResource',
  'Shop',
  'ionic',
  'templates',
  'angulartics',
  'angulartics.google.analytics',
]);

app
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

});

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/modules/home/templates/home.template.html'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'js/modules/profile/templates/login.html'
      })
      .state('credit', {
        url: '/credit',
//        controller: 'CreditController',
        templateUrl: 'js/modules/shop/templates/credit.html'
      })
      .state('debit', {
        url: '/debit',
//        controller: 'DebitController',
        templateUrl: 'js/modules/shop/templates/debit.html'
      })
      .state('balance', {
        url: '/balance',
//        controller: 'DebitController',
        templateUrl: 'js/modules/shop/templates/balance.html'
      })
      .state('mybalance', {
        url: '/mybalance',
        controller: 'MyBalanceController',
        templateUrl: 'js/modules/shop/templates/mybalance.html'
      })
      ;
  }
]);
