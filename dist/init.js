vnjs.DEBUG = true;





vnjs.init({
	prefix: '',
	element: '.gameElement',
	gameDir: './game',
	scenesDir: "scenes",
	local: 'ru-RU',
	//entryScene: 'scene2/chapter1',
	screenClass: '.screen'
});

vnjs.on('character', function(data){
	const name = data.param.name;
	//console.log(name+": ", data.reply);
	
	let nameBox = document.querySelector('.name-box');
		nameBox.innerHTML = name;
	let reply = document.querySelector('.reply');
		reply.innerHTML = data.reply;
})


vnjs.on('screensLoaded', function(){
  vnjs.parse({ screen: 'main-menu' });//entry
  console.log('Экраны загружены')
})
