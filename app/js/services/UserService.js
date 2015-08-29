angular.module('UserService', [])
  .factory('UserService', ['$http', function($http){
    return {
      get : function () {
        console.log("we are doing something with the HomeService");
        $http.get('/api/get')
          .success(function(data) {
            console.log("data:", data);
          })
          .error(function(err) {
            console.log("err:", err);
          })
      }
    };
  }]);