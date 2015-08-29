angular.module('CategoryController', [])
  .controller('CategoryController', function($scope, $http, UserService){

    $scope.test = 'this shit is bomb';

    $scope.testButton = function() {
      console.log("fucking shit up day in and day out");
      // SQLservice.get('123');
    };

    $scope.getUserData = function() {
      var user = UserService.get();
      console.log("user:", user);
    }

    
});

