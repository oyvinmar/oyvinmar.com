module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['public/js/*.js', 'grunt.js']
    },

    min: {
      all: ['public/js/*.js']
    }
  });
};
