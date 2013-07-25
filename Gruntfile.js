var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var appconfig = {
    dir: 'app',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    appconfig: appconfig,
    express: {
      options: {
        port: process.env.PORT || 3000,
        output: 'Express server listening'
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js'
        }
      }
    },
    watch: {
      options: {
        nospawn: true, 
        livereload: LIVERELOAD_PORT,
        debounceDelay:  2000
      },
      express: {
        files:  [ 'server.js',
        '<%= appconfig.dir %>/*.html',
      '<%= appconfig.dir %>/js/{,*/}*.js' ],
      tasks:  [ 'express:dev' ]
    }
  },
  open: {
    server: {
      path: 'http://localhost:<%= express.options.port %>'
    }
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    },
    all: [
    'Gruntfile.js',
    'app/js/*.js',
    'server.js',
    ]
  },

  useminPrepare: {
    html: 'app/layout.html'
  },

  usemin: {
    html: 'app/layout.html'
  },

  hashres: {
    prod: {
      files: ['app/js/oyvinmar.min.js'],
      out: 'views/layout.html',
      fileNameFormat: '${hash}.${name}.cache.${ext}',
      renameFiles: true
    }
  }
});

grunt.registerTask('server', function (target) {
    // if (target === 'dist') {
    //   return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    // }

    grunt.task.run([
      'express:dev',
      // 'open'
      'watch'
      ]);
  });

grunt.registerTask('test', [
  ]);

grunt.registerTask('build', [
  'useminPrepare',
  'usemin',
  ]);

grunt.registerTask('default', [
  'jshint',
  ]);
};
