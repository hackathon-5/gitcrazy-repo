angular.module('EventController', [])
  .controller('EventController', function($scope, $http, $location) {

    $scope.options = [
      {name: "Husband", id: 0},
      {name: "Family", id: 2},
      {name: "Wife", id: 3},
      {name: "Couple", id: 4}
    ];
    $scope.category = null;
    $scope.name = '';

    $scope.submit = function() {
      $http.get('/api/get').then(function(res) {
        var temp = res.data.doc;
        console.log("Category: ", $scope.category);
        temp.category[$scope.category].size += 1;
        temp.category[$scope.category].events.push({'name': $scope.name, 'value': 1});
        console.log(temp);
        $http.put('/api/update', temp)
          .success(function(data) {
            angular.forEach(data.category, function(val, key) {
              angular.forEach(data.category, function(val2, key2) {
                if (val.size - val2.size > 5) {
                  console.log("We have a winner!!");
                }
              })
            })
            console.log('success');
            $location.path('/home');
          })
          .error(function(data){
            console.log('error: ' + data);
          });
      });
    };
});