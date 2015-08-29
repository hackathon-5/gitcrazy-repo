angular.module('HomeService', [])
  .factory('HomeService', ['$http', function($http){
    return {
      get : function(){
        console.log("we are doing something with the HomeService");
      }
    };
  }]);
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
                  $http.post('/api/sendText', {})
                    .success(function(data) {
                      console.log("yeah, we should have sent a text");
                    })
                    .error(function(err) {
                      console.log("err:", err);
                    })
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
angular.module('HomeController', [])
  .controller('HomeController', function($scope, $http){

    $scope.test1 = "we";
    $scope.test2 = "are";
    $scope.test3 = "going";
    $scope.test4 = "to WIN!";

    $scope.doSomething = function () {
      $http.post('/api/create', {name: 'bar'})
      .success(function (data) {
        console.log('success');
      })
      .error(function (data) {
        console.log('error :' + data);
      });
      console.log("this button is doing something");
    };

    var diameter = 960,
        format = d3.format(",d"),
        color = d3.scale.category10();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("div#chart").append("svg")
        .attr("viewBox","0 0 960 960")
        .attr("perserveAspectRatio","xMinYMid")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    $scope.summon_d3 = function() {
      d3.json('/api/get', function(error, root) {

        console.log("Root: ", root);
        if (error) throw error;

        var node = svg.selectAll(".node")
            .data(bubble.nodes(classes(root.doc))
            .filter(function(d) { return !d.children; }))
          .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("title")
            .text(function(d) { return d.className + ": " + format(d.value); });

        node.append("circle")
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d,i) { return color(i); });

        node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.className.substring(0, d.r / 3); });
      });

      // Returns a flattened hierarchy containing all leaf nodes under the root.
      function classes(root) {
        var classes = [];

        function recurse(name, node) {
          if (node.category) node.category.forEach(function(child) { recurse(node.name, child); });
          else classes.push({packageName: name, className: node.name, value: node.size});
        }

        recurse(null, root);
        return {children: classes};
      }
    };

    var chart = $(".bubble"),
        aspect = chart.width() / chart.height(),
        container = chart.parent();
    $(window).on("resize", function() {
        var targetWidth = container.width();
        chart.attr("width", targetWidth);
        chart.attr("height", Math.round(targetWidth / aspect));
    }).trigger("resize");

    //$http.get('/api/get').then(function(res) {
      $scope.summon_d3();
    //});
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
  'EventController',
  'CategoryController',
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
        controller: 'IndexController'
      })
      .when('/addEvent', {
        templateUrl: 'views/addEvent.html',
        controller: 'EventController'
      });

    $locationProvider.html5Mode(true);
}]);