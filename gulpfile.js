var karma = require('karma').server;
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var minifyHtml = require("gulp-minify-html");
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var usemin = require('gulp-usemin');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

var paths = {
  sass: [
    './scss/**/*.scss',
  ],
  scripts: ['./app/**/*.js', './app/*.js'],
  templates:[
    './app/**/*.html',
  ],
  html: './app/index.html',
};

gulp.task('default', ['sass', 'templates-js', 'usemin']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
//    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('usemin', ['sass', 'templates-js'], function(done){
    gulp.src(paths.html)
        .pipe(usemin({
//            css: [/*minifyCss(),*/ 'concat', rev()],
//            html: [/*minifyHtml({empty: true})*/],
            jstemplates: [uglify(), rev()],
            js: [/*jshint.reporter('default'),*/ ngAnnotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('www/'))
        .on('end', done);
});

gulp.task('usemin-test', ['sass', 'templates-js'], function(done){
    gulp.src(paths.html)
        .pipe(usemin({
//            css: [/*minifyCss(),*/ 'concat', rev()],
//            html: [/*minifyHtml({empty: true})*/],
            jstemplates: [],
            js: [/*jshint.reporter('default'),*/ ngAnnotate()]
        }))
        .pipe(gulp.dest('www/'))
        .on('end', done);
});

gulp.task('templates-html', function () {
    gulp.src(paths.templates) // path to your files
    .pipe(gulp.dest('./www/'));
});
gulp.task('templates-js', function (done) {
    gulp.src(paths.templates)
//        .pipe(minifyHTML({ quotes: true }))
//        .pipe(template({filename: 'templates.js', root: 'templates', standalone: true}))
        .pipe(templateCache({filename: 'js/templates.js', module: 'templates', standalone: true}))
//        .pipe(size({title: 'HTML fragments'}))
        .pipe(gulp.dest('./app/'))
        .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass', 'usemin']);
  gulp.watch(paths.scripts, ['usemin']);
  gulp.watch(paths.templates, ['templates-js', 'usemin']);
  gulp.watch(paths.html, ['usemin']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/**
* Test task, run test once and exit
*/
gulp.task('test', ['usemin-test'], function(done) {
    karma.start({
        configFile: __dirname + '/test/client/karma.mocha.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});
