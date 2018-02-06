const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
//const browserify = require('gulp-browserify');    .pipe(browserify())

gulp.task('default', () => {
  return gulp.src(['./src/*.js', './src/**/*.js'])
    .pipe(babel({
			presets: ['env']
		}))

    .pipe(concat('vnjson.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.watch(['./src/*.js', './src/**/*.js'], ['default']);