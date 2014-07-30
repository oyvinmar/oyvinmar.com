module.exports = {
  files: {
    js: {
      bower: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/lodash/dist/lodash.compat.js',
        'bower_components/backbone/backbone.js',
        'bower_components/handlebars.js/dist/handlebars.js',
        'bower_components/jquery-waypoints/waypoints.js',
        'bower_components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js',
        'bower_components/jquery.stellar/jquery.stellar.js',
        'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
        'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
        'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js'
      ],

      bowerAll: [
        'bower_components/**/*.js'
//        'vendor/**/*.js'
      ],

      scripts: ['src/app/**/*.js', 'test/**/*.js'],
      app: [
        'src/app/remote_call_api.js',
        'src/app/lifestream.js',
        'src/app/init.js'
      ]
    },

    fonts: 'bower_components/fontawesome/fonts/*',

    images: 'src/img/**',
    scss: 'src/styles/base.scss',
    scssAll: 'src/styles/*.scss',

    server: ['app.js', 'server.js', 'Procfile', 'package.json'],

    html: ['src/app/**/*.html'],
    htmlIndex: 'src/app/index.html',

    test: {
      unit: ['test/**/*.js']
    }
  }
};