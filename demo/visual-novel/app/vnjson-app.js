/*
 * PIXI init
 */
const config = {
	width: 600, 
	height: 400,
	backgroundColor: 0x1099bb
}

const app = new PIXI.Application(config);
document.querySelectorAll('#pixi')[0].appendChild(app.view);

var _screens = {
	scene: new PIXI.Container('scene'),
	show: new PIXI.Container('show')
}
app.stage.addChild(_screens.scene);
app.stage.addChild(_screens.show);

//app.stop();

/**
 * VNJSON INIT
 */

const vnjs = new Vnjson();


vnjs.current = {
	screen: {} //графика на экране

}
vnjs.conf = {
	typespeed: 30,
	volume: 100,
	zoom: 100
};



var _assets = {};


/**
 * Plugins
 */

vnjs.on('sceneLoad', assetsLoader);
vnjs.on('print', vnjsonPrint);
vnjs.on('character', vnjsonCharacter)
vnjs.on('audio', vnjsonAudio)
vnjs.on('menu', gameMenu);
vnjs.on('center', vnjsonCenter);
vnjs.on('left', vnjsonLeft);
vnjs.on('right', vnjsonRight);
vnjs.on('show', vnjsonShow)
vnjs.on('scene', vnjsonScene);
vnjs.on('rotate', vnjsonRotate);
vnjs.on('scale', vnjsonScale);
vnjs.on('blur', vnjsonBlur);
vnjs.on('clear', vnjsonClear)
vnjs.on('exec', ctx=>{});
vnjs.on('*', err=>{
	console.error(`Плагин { ${err} } не зарегистрирован`);
});

vnjs.on('screen', function (screenName){
	vue.$data.screen = screenName;
});

/**
 * Config loader
 */
fetch('./vn.json')
  		.then( r => r.json() )
  		.then( (config)=>{
		
const { scenes, entry, mode } = config;
/**
 * Scenes load order 
 * [once] - Assets&&scenes dinamic load
 * [all] - Load all game resourse
 */
vnjs.sceneLoader.mode = mode;
vnjs.sceneLoader.entry = entry;
/**
 * Scene loader
 */
vnjs.getScenes(	scenes, function (scene, next){

fetch(scene.url)
  		.then( r => r.json() )
  		.then( (body)=>{
  				vnjs.setScene(scene.name, body);
  				console.log(`<${scene.name}>`);
  				console.log(body)
  				next();				
  		});

});

});//vn.json

vnjs.on('preload', function (scene){
	console.log(`<${scene.name}>`);
	if(vnjs.sceneLoader.mode==='once')
				vue.$data.screen = 'preload';

});

vnjs.on('load', function (progress, url){
	console.log(progress, url)
})

vnjs.on('postload', function (scene){
	console.log(`</${scene.name}>`);

})


vnjs.on('jump.label', function (pathname){
	console.log(`[${pathname}]`)
	  vue.$data.screen = 'stream';
	  vnjsonExecute()
});
vnjs.on('jump.scene', function (){

if(vnjs.sceneLoader.mode==='all'){
		console.log('Прыгает по загруженным сенам')
		vue.$data.screen = 'stream';
		vnjsonExecute()
}
else if(vnjs.sceneLoader.mode==='once'){
	setTimeout(function (){
			vue.$data.screen = 'stream';
			vnjsonExecute()
	}, 500)//Задержка для экрана загрузки
	
}



});

function vnjsonExecute (){
	setTimeout(()=>{
		vnjs.exec();
}, 0);
}