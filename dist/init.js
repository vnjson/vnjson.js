vnjs.DEBUG = true;


/*
vnjs.emit('getScene', 'scene1');

vnjs.emit('getScene', 'scene2')
vnjs.emit('getScene', 'lab')
*/

vnjs.on('character', function(data){
	const name = data.param.name;
	console.log(name+": ", data.reply)
})

vnjs.init({
	gameDir: './',
	scenesDir: "scenes"
});

vnjs.parse({'jump': 'scene1/mainMenu'})