angular.module('HomeService', [])
  .factory('HomeService', ['$http', function($http){
    return {
      get : function(){
        console.log("we are doing something with the HomeService");
      }
    };
  }]);
angular.module('HomeController', [])
  .controller('HomeController', function($scope, $http){

    $scope.test1 = "we";
    $scope.test2 = "are";
    $scope.test3 = "going";
    $scope.test4 = "to WIN!";

    $scope.doSomething = function () {
      $http.get('/api/get')
      .success(function (data) {
        console.log('success');
      })
      .error(function (data) {
        console.log('error :' + data);
      });
      console.log("this button is doing something");      
    };
});
angular.module('IndexController', [])
  .controller('IndexController', function($scope, $http){

    $scope.test = 'this shit is bomb';

    $scope.testButton = function() {
      console.log("fucking shit up day in and day out");
      // SQLservice.get('123');
    };
});
var app = angular.module('GitCrazy', [
  'ngRoute',
  'ngResource', 
  'appRoutes',
  'HomeController',
  'IndexController', 
  'HomeService',
  'ui.utils',
  'ui.bootstrap',
]);
angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/', {
        templateUrl: 'views/index.html',
      });

    $locationProvider.html5Mode(true);
}]);