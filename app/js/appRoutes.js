angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      });

    $locationProvider.html5Mode(true);
}]);