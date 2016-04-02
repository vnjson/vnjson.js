"use strict"
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	source = require('./source'),
	destCli = '../renjs-cli/YAML_tpl/build/www/vendors/';

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
gulp.task('init',function(){
gulp.src("./init.js")
	.pipe(gulp.dest(destCli))
	.pipe(gulp.dest('dist'))
	
});

gulp.watch(['src/*.js','src/**/*.js','gulpfile.js','source.js','init.js'],function(){
	gulp.run('vnjson');
	gulp.run('vendors');
	gulp.run('init');
});
gulp.task('default',function(){
	gulp.run('vnjson');
});