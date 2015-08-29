angular.module('HomeController', [])
  .controller('HomeController', function($scope, $http, $location){

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

        node.on("click", function(d, i) {
          console.log(i);
          // $location.path("/category/" + i);
        });
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
