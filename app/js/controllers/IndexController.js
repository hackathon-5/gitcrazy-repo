angular.module('IndexController', [])
  .controller('IndexController', function($scope, $http){    

    $scope.test = 'this shit is bomb';

    $scope.testButton = function() {
      console.log("fucking shit up day in and day out");
      // SQLservice.get('123');
    };


});
