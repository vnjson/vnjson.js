var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var source = require('./source'),
	server = require('./server'),
	dist = '../game/build/vendors';//'./dist';	
/*
gulp.task('min', function(){
  return gulp.src(source.ren)
    .pipe(uglify())
    .pipe(concat('ren.min.js'))
    .pipe(gulp.dest(dist));
});
*/
gulp.task('renjs',function(){
gulp.src(source.ren)
	.pipe(concat('ren.js'))
	.pipe(gulp.dest(dist))
	
});

gulp.task('vendors',function(){
gulp.src(source.vendors)
	.pipe(concat('vendors.js'))
	.pipe(gulp.dest(dist))
});


gulp.watch(['src/*.js','src/**/*.js','gulpfile.js','source.js'],function(){
	gulp.run('renjs');
	gulp.run('vendors');
});
gulp.task('default',function(){
	server.start();
});