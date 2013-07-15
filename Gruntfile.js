module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'app.js'
        }
      },
      prod: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      express: {
        files:  [ '*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
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
    'public/js/*.js',
    'app.js',
    ]
  },

  useminPrepare: {
    html: 'public/layout.html'
  },

  usemin: {
    html: 'public/layout.html'
  },

  hashres: {
    prod: {
      files: ['public/js/oyvinmar.min.js'],
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
