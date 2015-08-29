angular.module('HomeService', [])
  .factory('HomeService', ['$http', function($http){
    return {
      get : function(){
        console.log("we are doing something with the HomeService");
      }
    };
  }]);