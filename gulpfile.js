var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var source = require('./source'),
	server = require('./server'),
	dist = '../renjs-cli/vn_tpl/vendors';//'./dist';	
/*
gulp.task('min', function(){
  return gulp.src(source.ren)
    .pipe(uglify())
    .pipe(concat('ren.min.js'))
    .pipe(gulp.dest(dist));
});
*/
gulp.task('vnjson',function(){
gulp.src(source.vnjson)
	.pipe(concat('vnjson.js'))
	.pipe(gulp.dest(dist))
	
});

gulp.task('vendors',function(){
gulp.src(source.vendors)
	.pipe(concat('vendors.js'))
	.pipe(gulp.dest(dist))
});


gulp.watch(['src/*.js','src/**/*.js','gulpfile.js','source.js'],function(){
	gulp.run('vnjson');
	gulp.run('vendors');
});
gulp.task('default',function(){
	server.start();
});