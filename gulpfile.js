var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var source = require('./source'),
	server = require('./server');	
var destCli = '../renjs-cli/YAML_tpl/build/www/vendors/';
gulp.task('min', function(){
  return gulp.src(source.ren)
    .pipe(uglify())
    .pipe(concat('vnjson.min.js'))
	.pipe(gulp.dest(destCli))
	.pipe(gulp.dest('dist'))
});

gulp.task('vnjson',function(){
gulp.src(source.vnjson)
	.pipe(concat('vnjson.js'))
	.pipe(gulp.dest(destCli))
	.pipe(gulp.dest('dist'))
	
});

gulp.task('vendors',function(){
gulp.src(source.vendors)
	.pipe(concat('vendors.js'))
	.pipe(gulp.dest(destCli))
	.pipe(gulp.dest('dist'))
});


gulp.watch(['src/*.js','src/**/*.js','gulpfile.js','source.js'],function(){
	gulp.run('vnjson');
	gulp.run('vendors');
});
gulp.task('default',function(){
	server.start();
});