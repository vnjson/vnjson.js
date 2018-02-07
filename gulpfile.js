const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
//const browserify = require('gulp-browserify');    .pipe(browserify())

gulp.task('default', () => {
  return gulp.src(['./src/*.js', './src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
			presets: ['@babel/env']
		}))

    .pipe(concat('vnjson.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.watch(['./src/*.js', './src/**/*.js'], ['default']);