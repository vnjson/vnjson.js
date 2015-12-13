var gulp = require('gulp'),
	concat = require('gulp-concat');
var dest = '../game_template/scripts/';	
var uglify = require('gulp-uglify');

var source = require('./source');

gulp.task('min', function() {
  return gulp.src(source.ren)
    .pipe(uglify())
    .pipe(concat('ren.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('renjs',function(){
gulp.src(source.ren)
	.pipe(concat('ren.js'))
	.pipe(gulp.dest(dest))
	
});

gulp.task('libs',function(){
gulp.src(source.libs)
	.pipe(concat('libs.js'))
	.pipe(gulp.dest(dest))
});


gulp.watch(['src/*.js','src/**/*.js','gulpfile.js','source.js'],function(){
	gulp.run('renjs');
	gulp.run('libs');
});
gulp.task('default',function(){
	gulp.run('renjs');
	//gulp.run('libs');

});