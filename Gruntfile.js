var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  var appconfig = {
    app: 'app',
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
        '<%= appconfig.app %>/*.html',
        '<%= appconfig.app %>/less/{,*/}*.less',
        '<%= appconfig.app %>/js/{,*/}*.js'  ],
      tasks:  [ 'express:dev' ]
    }
  },
  
  open: {
    server: {
      path: 'http://localhost:<%= express.options.port %>'
    }
  },

  clean: {
    dist: {
      files: [{
        dot: true,
        src: [
        '<%= appconfig.dist %>/*',
        '!<%= appconfig.dist %>/.git*'
        ]
      }]
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

  rev: {
    dist: {
      files: {
        src: [
            '<%= appconfig.dist %>/scripts/{,*/}*.js',
            '<%= appconfig.dist %>/styles/{,*/}*.css',
            '<%= appconfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= appconfig.dist %>/styles/fonts/*'
        ]
      }
    }
  },

  useminPrepare: {
    options: {
      dirs: ['<%= appconfig.dist %>']
    },
    html: 'app/index.html'
  },

  imagemin: {
    dist: {
      files: [{
        expand: true,
        cwd: '<%= appconfig.app %>/img',
        src: '{,*/}*.{png,jpg,jpeg}',
        dest: '<%= appconfig.dist %>/app/img'
      }]
    }
  },

  less: {
    dist: {
      options: {
        yuicompress: true
      },
      files: {
        '<%= appconfig.dist %>/app/less/base.css': '<%= appconfig.app %>/less/base.less'
      }
    }
  },

  usemin: {
    options: {
      dirs: ['<%= appconfig.dist %>']
    },
    html: ['<%= appconfig.dist %>/{,*/}*.html'],
  },

  htmlmin: {
    dist: {
      files: [{
        expand: true,
        cwd: '<%= appconfig.app %>',
        src: '*.html',
        dest: '<%= appconfig.dist %>/app'
      }]
    }
  },

  copy: {
    dist: {
      files: [
      {
        expand: true,
        cwd: '<%= appconfig.app %>',
        dest: '<%= appconfig.dist %>/app',
        src: ['js/app.js', 'fonts/*', 'img/{,*/}*.{webp,gif}']
      },
      {
        expand: true,
        dest: '<%= appconfig.dist %>',
        src: ['server.js', 'Procfile', 'package.json', 'oauth_tokens.json']
      },
      ]
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
  'clean:dist',
  'useminPrepare',
  'less:dist',
  'imagemin',
  'htmlmin',
  'concat',
  'uglify',
  'copy',
  'rev',
  'usemin',
  ]);

grunt.registerTask('default', [
  'jshint',
  ]);
};
