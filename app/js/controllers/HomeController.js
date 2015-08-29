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