var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('build_src',function(){
	var arr = [
		"src/ren.js",
		"src/run.js",
		"src/createLayers.js",
		"src/concatKeywords.js",
		"src/parse.js",
		"src/appendChilds.js",
		"src/navigator.js",
		"src/memoryCard.js",
		
		"src/keywords/scene.js",
		"src/keywords/show.js",
		"src/keywords/phrase.js",
		"src/keywords/character.js",
		"src/keywords/jump.js",
		"src/keywords/menu.js",
		"src/keywords/audio.js",

		"lib/store.min.js",
		"lib/howler.min.js",
		"lib/move.min.js"

	];

gulp.src(arr)
	.pipe(concat('ren.js'))
	.pipe(gulp.dest(''))
})
gulp.watch('src/*.js',function(){
	gulp.run('build_src');
	
})