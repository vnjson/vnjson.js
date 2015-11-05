ren.loadGame = function(){


$.when(
	$.ajax('game/characters.json5'),
	$.ajax('game/options.json5'),
	$.ajax('game/layers.json5'),
	$.ajax('game/images.json5'),
	$.ajax('game/audio.json5'),
	$.ajax('package.json5')
).then(function(characters,options,layers,images,audio,package){

	ren.game = {
		characters:JSON5.parse(characters[0]),
		options:JSON5.parse(options[0]),
		layers:JSON5.parse(layers[0]),
		images:JSON5.parse(images[0]),
		audio:JSON5.parse(audio[0]),
		package:JSON5.parse(package[0])
	}
		

})

.then(function(){

	ren.imagePreload();
})
.then(function(){
	ren.createLayers(); 
})

.then(function(){
	
	ren.audioLoad();
})
.then(function(){
	ren.concatKeywords(); 
})


.then(function(){
	ren.event.jump(ren.game.options.startLabel)
})

}