var appname = "GitCrazy";

var devFiles = [
  'api/*.js',
  'app/js/**/*.js',
  'app/js/*.js',
  'server.js',
  'events.js',
  'Gruntfile.js',
];

var karmaFiles = [
  'public/libs/angular/angular.min.js',
  'public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'public/libs/angular-resource/angular-resource.min.js',
  'public/libs/angular-route/angular-route.min.js',
  'public/libs/angular-ui-utils/ui-utils.js',
  'public/libs/jquery/jquery.min.js',
  'public/libs/jquery-ui/ui/jquery-ui.min.js',
  'public/libs/moment/min/moment.min.js'
];

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      files: {
        src: devFiles
      } 
    },

    concat: {
      js: {
        src: [ 'app/js/services/**/*.js',
        'app/js/controllers/**/*.js',
        'app/js/app.js',
        'app/js/appRoutes.js'
        ],
        dest: 'app/' + appname + '.js'
      },
      jsBundle: {
        src: [ 'app/libs/angular/angular.js',
        'app/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'app/libs/angular-resource/angular-resource.min.js',
        'app/libs/angular-route/angular-route.min.js',
        'app/libs/angular-ui-utils/ui-utils.js',
        'app/libs/jquery/jquery.min.js',
        'app/libs/jquery-ui/ui/jquery-ui.min.js'

        ],
        dest: 'app/' + appname + '-bundle.js'
      },
      cssBundle: {
        src: [ 'app/css/app.css',
        'app/libs/bootstrap/dist/css/bootstrap-theme.css',
        'app/libs/animate.css/animate.css',
        'app/libs/bootstrap/dist/css/bootstrap.css',
        'app/libs/font-awesome/font-awesome.css',
        ],
        dest: 'app/' + appname + '-bundle.css'
      }


    },

    connect: {
      server: {
        options: {
          base: '.',
          port: 3000
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            nodemon.on('restart', function () {
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    watch: {
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      },
      dev: {
        files: devFiles,
        tasks: ['concat']
      } 
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.registerTask('server',  ['concurrent', 'nodemon', 'watch']);
  grunt.registerTask('default', ['concat']);
};