module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-hashres');

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['public/js/*.js', 'grunt.js']
    },

    min: {
      dist: {
        src: ['public/js/*.js'],
        dest: 'public/js/oyvinmar.min.js'
      }
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
};
