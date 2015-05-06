var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var replace = require('gulp-replace');
var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
  connect.server({
    root: 'project/',
    livereload: true
  });
});

gulp.task('less', function() {
  gulp.src('project/less/main.less')
    .pipe(less())
    .pipe(replace(/\/dist/g, ''))
   // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('project/dist/css'))
    .pipe(connect.reload());
});

gulp.task('prefix', function () {
  gulp.src('project/dist/css/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 1%'],
        cascade: true
      }))
      .pipe(gulp.dest('project/dist/css'));
})

gulp.task('csslint', function () {
  gulp.src('project/dist/css/*.css')
      .pipe(csslint())
      .pipe(csslint.reporter());
});

gulp.task('html', function() {
  gulp.src('project/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('project/dist/js/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('project/less/**/*.less', ['less']);
  gulp.watch('project/dist/css/*css', ['prefix']);
  gulp.watch('project/*.html', ['html']);
  gulp.watch('project/dist/js/*.js', ['js']);
});

gulp.task('default', ['connect', 'less', 'prefix', 'watch']);