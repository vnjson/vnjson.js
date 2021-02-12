/*
	get UI elements
 */


const quetionEl = document.getElementById('quetion');
const menuItemEl = document.getElementById('menu-item');
const menuEl = document.getElementById('menu');
const scoresEl = document.getElementById('scores');

const dialogBox = document.getElementById('dialog-box');
//next
dialogBox.addEventListener('mousedown', e=>{
										vnjs.next();
					});
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

vnjs.on('parse', function(ctx){
	console.log(this.currentSceneName, this.currentLabelName, this.index, ctx);
});

vnjs.on('*', e=>{
	console.error(`Плагин { ${e} } не зарегистрирован`);
});

/*
 *
 */

vnjs.getScenes({
	scenes: [
		{ name: 'chapter1', path: '/scenes/chapter1.json'},
		{ name: 'chapter2', path: '/scenes/chapter2.json'},
		{ name: 'chapter3', path: '/scenes/chapter3.json'}
	],

	order: 'once',//all|| once
	loader: (scene, next)=>{
			//ajax or node require
			fetch(scene.path)
  							.then( r => r.json() )
  							.then( (body)=>{
  									vnjs.setScene(scene.name, body);
  									next();
  							});
  /********************nodejs****************************
   *	vnjs.setScene(scene.name, require(scene.path) )		*
	 *  next();																						*
	 *  																									*
   ******************************************************/					
	}
});

vnjs.on('ready', function(){
	console.log('[ready]')
	this.parse({jump: 'chapter1.start'})

})





   