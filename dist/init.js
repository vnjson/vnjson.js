vnjs.DEBUG = true;





vnjs.init({
	prefix: '',
	element: '.gameElement',
	gameDir: './game',
	scenesDir: "scenes",
	local: 'ru-RU',
	entryPoint: 'scene1/chapter1',
	screenClass: '.screen'
});





vnjs.on('scene', function(data){

	for(let a of this.current.scene().assets){
			if(a.id===data){
				
				var el = document.querySelector(vnjs.conf.element);
				el.style.background = `url('${a.path}')`
			}
	}

})