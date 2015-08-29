angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      // .when('/home', {
      //   templateUrl: 'views/home.html',
      //   controller: 'HomeController'
      // })
      // .when('/index', {
      //   templateUrl: 'views/index.html',
      //   controller: 'IndexController'
      // })
      .otherwise('/');;


    $locationProvider.html5Mode(true);
}]);
