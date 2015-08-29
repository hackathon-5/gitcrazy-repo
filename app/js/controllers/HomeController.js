angular.module('HomeController', [])
  .controller('HomeController', function($scope, $http, $location){

    $scope.selectedCategory = 0;

    $scope.showEvents = function() {
      $http.get('/api/get').then(function(res) {
        var temp = res.data.doc;
        $scope.events = temp.category[$scope.selectedCategory].events
      });
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
          $scope.selectedCategory = i;
          $scope.showEvents();
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

    $scope.summon_d3();

    $scope.options = [
      {name: "Husband", id: 0},
      {name: "Family", id: 2},
      {name: "Wife", id: 3},
      {name: "Couple", id: 4}
    ];
    $scope.category = 0;
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
            $scope.showEvents();
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
          })
          .error(function(data){
            console.log('error: ' + data);
          });
      });
    };

    $scope.showEvents();

});
