
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	source = require('./source');
	var deployFolder = '../vnjson-utils/deploy/www/scripts';

gulp.task('default',function(){
gulp.src(source.vnjson)
	.pipe(concat('vnjson.js'))
	.pipe(gulp.dest(deployFolder))
	.pipe(gulp.dest('./dist'))
});

gulp.task('vendors',function(){
gulp.src(source.vendors)
	.pipe(concat('vendors.js'))
	.pipe(gulp.dest(deployFolder))
	.pipe(gulp.dest('dist'))
});


gulp.watch(['src/*.js','src/**/*.js','gulpfile.js','source.js','init.js'],function(){
	gulp.run('default');
	gulp.run('vendors');

});
