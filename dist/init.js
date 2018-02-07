vnjs.DEBUG = true;



vnjs.on('character', function(data){
	const name = data.param.name;
	console.log(name+": ", data.reply)
})

vnjs.init({
	gameDir: './game',
	scenesDir: "scenes",
	local: 'ru-RU',
	entryScene: 'scene2/chapter1' 
});

