module.exports = {
  files: {
    js: {
      scripts: ['src/app/**/*.js', 'test/**/*.js'],
      app: [
        './src/app/init.js'
      ]
    },

    fonts: 'bower_components/fontawesome/fonts/*',

    images: 'src/img/**',
    scss: ['src/styles/base.scss','src/styles/cv.scss'],
    scssAll: 'src/styles/*.scss',

    server: ['app.js', 'server.js', 'Procfile', 'package.json'],

    html: ['src/app/**/*.html'],
    htmlIndex: 'src/app/index.html',
    htmlCv: 'src/app/cv.html',

    test: {
      unit: ['test/**/*.js']
    }
  }
};