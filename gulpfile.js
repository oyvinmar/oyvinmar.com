var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var embedlr = require('gulp-embedlr');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var rimraf = require('rimraf');
var lr = require('tiny-lr');
var refresh = require('gulp-livereload');
var _if = require('gulp-if');
var browserify = require('browserify');
var gulpify = require('gulp-browserify');
var files = require('./build.config.js').files;
//var watchify = require('watchify');
var source = require('vinyl-source-stream');
var argv = require('minimist')(process.argv.slice(2));

var lrserver = lr();

var RELEASE = !!argv.release;

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

gulp.task('lint', function () {
  return gulp.src(files.js.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('vendor', ['vendor:fonts']);

gulp.task('vendor:fonts', function () {
  return gulp.src(files.fonts)
    .pipe(gulp.dest('dist/app/fonts'));
});

gulp.task('html', ['html:index', 'html:cv']);

var appStream = gulp.src(files.js.app)
  .pipe(gulpify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(rename('app.js'))
  .pipe(gulp.dest('dist/app/js'))
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('dist/app/js'));

gulp.task('html:index', function () {
  return gulp.src(files.htmlIndex)
    .pipe(_if(RELEASE, inject(appStream, {
      ignorePath: 'dist/app',
      addRootSlash: false
    })))
    .pipe(_if(!RELEASE, inject(gulp.src('dist/app/js/app.js', {read: false}), {
      ignorePath: 'dist/app',
      addRootSlash: true
    })))
    .pipe(_if(!RELEASE, embedlr()))
    .pipe(gulp.dest('dist/app/'))
    .pipe(refresh(lrserver));
});

gulp.task('html:cv', function () {
  return gulp.src([files.htmlCv])
    .pipe(_if(!RELEASE, embedlr()))
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
});

gulp.task('browserify', function () {
  var bundler = browserify(files.js.app, {
    insertGlobals: true,
    debug: true
  });

  return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/app/js'))
    .pipe(refresh(lrserver));
});

gulp.task('watch', ['lint', 'vendor', 'styles', 'browserify', 'html'], function () { // Run watch after scripts, vendor, etc.. is finished
  gulp.watch(files.images, ['images']);
  gulp.watch(files.scssAll, ['styles']);
  gulp.watch(files.html, ['html']);
  gulp.watch(files.js.scripts, ['lint', 'browserify']);
});

gulp.task('default', ['images', 'lint', 'vendor', 'styles', 'browserify', 'html', 'serve', 'watch']);
gulp.task('build', ['images', 'lint', 'vendor', 'styles', 'html', 'server:copy']);
