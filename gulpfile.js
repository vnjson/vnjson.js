var gulp = require('gulp'),
	concat = require('gulp-concat');
gulp.task('default',function(){
	gulp.run('renjs');

})

gulp.task('renjs',function(){
	var arr = [
		"src/ren.js",
		"src/reg.js",
		"src/loadGame.js",
		"src/events/createLayers.js",
		"src/imagePreload.js",
		"src/audioLoad.js",
		"src/getScene.js",
		"src/events/concatKeywords.js",
		"src/events/event.js",
		"src/events/menu.js",
		"src/parse.js",
		"src/run.js",
	];

gulp.src(arr)
	.pipe(concat('ren.js'))
	.pipe(gulp.dest('template/js'))
	
});

gulp.task('libs',function(){
	var arr = [			
		"libs/jquery.min.js",
		"libs/jquery.imgpreload.min.js",

		"libs/json5.js",
		"libs/store.min.js",
		"libs/howler.min.js",
		"libs/verbalExpression.js",
	];
	gulp.src(arr)
			.pipe(concat('libs.js'))
			.pipe(gulp.dest('template/js'))
})

gulp.task('plugins',function(){

	gulp.src("template/game/plugins/**/*.js")
			.pipe(concat('plugins.js'))
			.pipe(gulp.dest('template/js'));
	
})

gulp.watch(['src/*.js','gulpfile.js'],function(){
	gulp.run('renjs');
	gulp.run('plugins')
});
