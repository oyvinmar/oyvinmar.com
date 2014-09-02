//var https = require('http');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var embedlr = require('gulp-embedlr');
var rename = require('gulp-rename');
//var debug = require('gulp-debug');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var rimraf = require('rimraf');
var lr = require('tiny-lr');
var refresh = require('gulp-livereload');
var files = require('./build.config.js').files;

var lrserver = lr();
var livereloadport = 35729;

gulp.task('styles', function () {
  return gulp.src(files.scss)
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('dist/app/styles'))
    .pipe(refresh(lrserver));
});

gulp.task('images', function () {
  return gulp.src(files.images)
    .pipe(gulp.dest('dist/app/img'))
    .pipe(refresh(lrserver));
});

gulp.task('scripts', function () {
  return gulp.src(files.js.app)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/app'))
    .pipe(refresh(lrserver));
});

gulp.task('vendor', ['vendor:bower', 'vendor:fonts']);

gulp.task('vendor:bower', function () {
  return gulp.src(files.js.bowerAll)
    .pipe(gulp.dest('dist/app/bower_components'));
});

gulp.task('vendor:fonts', function () {
  return gulp.src(files.fonts)
    .pipe(gulp.dest('dist/app/fonts'));
});

gulp.task('html', ['html:index-debug', 'html:index', 'html:cv']);

var appStream = gulp.src(files.js.bower.concat(files.js.app))
  .pipe(concat('app.js'))
  .pipe(uglify(), {
    outSourceMap: true
  })
  .pipe(rev())
  .pipe(gulp.dest('dist/app/js'));

gulp.task('html:index', function () {
  return gulp.src(files.htmlIndex)
    .pipe(inject(appStream, {
      ignorePath: 'dist/app',
      addRootSlash: false
    }))
    .pipe(gulp.dest('dist/app/'))
    .pipe(refresh(lrserver));
});

// Create index.html from mustache template
gulp.task('html:index-debug', function () {
  return gulp.src(files.htmlIndex)
    .pipe(rename('index-debug.html'))
    .pipe(inject(gulp.src(files.js.bower.concat(files.js.app), {read: false}), {
      ignorePath: 'src/app',
      addRootSlash: true
    }))
    .pipe(embedlr())
    .pipe(gulp.dest('dist/app/'))
    .pipe(refresh(lrserver));
});

gulp.task('html:cv', function() {
  return gulp.src(files.htmlCv)
    .pipe(embedlr())
    .pipe(gulp.dest('dist/app/'))
    .pipe(refresh(lrserver));
});

gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

gulp.task('server:copy', function () {
  return gulp.src(files.server)
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['server:copy'], function () {
  var app = require('./dist/app');
  app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

  //Set up your livereload server
  lrserver.listen(livereloadport);
});

gulp.task('watch', ['scripts', 'vendor', 'styles', 'html'], function () { // Run watch after scripts, vendor, etc.. is finished
  gulp.watch(files.js.app, ['scripts']);
  gulp.watch(files.images, ['images']);
  gulp.watch(files.scssAll, ['styles']);
  gulp.watch(files.htmlIndex, ['html:index-debug']);
  gulp.watch(files.htmlCv, ['html:cv']);
});

gulp.task('default', ['images', 'scripts', 'vendor', 'styles', 'html:index-debug', 'serve', 'watch']);
gulp.task('build', ['images', 'scripts', 'vendor', 'styles', 'html:index', 'server:copy']);
