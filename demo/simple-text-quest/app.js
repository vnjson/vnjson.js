/*
	get UI elements
 */


const quetionEl = document.getElementById('quetion');
const menuItemEl = document.getElementById('menu-item');
const menuEl = document.getElementById('menu');
const scoresEl = document.getElementById('scores');

const dialogBox = document.getElementById('dialog-box');
//next

/*
	Init
 */

const vnjs = new Vnjson();

/**
 * Plugins
 */
vnjs.on('alert', e=>{ alert(e); });
vnjs.on('print', print);
vnjs.on('menu', menu);
vnjs.on('character', character);
vnjs.on('point', point);

vnjs.on('exec', function(ctx){
	console.log(this.currentSceneName, this.currentLabelName, this.index, ctx);
});

vnjs.on('*', e=>{
	console.error(`Плагин { ${e} } не зарегистрирован`);
});

/*
 *
 */
const __scenes = [
		{ name: 'chapter1', path: '/scenes/chapter1.json'},
		{ name: 'chapter2', path: '/scenes/chapter2.json'}
	]
vnjs.getScenes(__scenes, function(scene, next){

	fetch(scene.path)
  		.then( r => r.json() )
  		.then( (body)=>{
  				vnjs.setScene(scene.name, body);
  				next();
  		});
});

vnjs.on('ready', function(){

	dialogBox.addEventListener('mousedown', e=>{
										vnjs.next();
	});
	console.log('[ready]');
	this.exec({jump: 'chapter1.start'})

})





   