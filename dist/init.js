vnjs.DEBUG = true;





vnjs.init({
	prefix: '',
	element: '.gameElement',
	gameDir: './game',
	scenesDir: "scenes",
	local: 'ru-RU',

	screenClass: '.screen'
});



vnjs.on('screensLoaded', function(){

  this.parse( { jump: 'entry/point' } )
});


vnjs.on('scene', function(data){

	for(let a of this.current.scene().assets){
			if(a.id===data){
				
				var el = document.querySelector(vnjs.conf.element);
				el.style.background = `url('${a.path}')`
			}
	}

})