


function vnjsonAudio (data){

PIXI.sound.stopAll();

if(typeof data==='string'){
		if(data==="pause"){
			PIXI.sound.togglePauseAll();
		}
		else if(data==='stop'){
			PIXI.sound.stopAll();
		}
		else if(action==='mute'){
			//PIXI.sound.toggleMuteAll();
		}
		else{
			_assets[name].volume = vnjs.conf.volume/1000;
			_assets[data].play();
			prevAudio = data;
		}
}
else{
let { name, volume, action, loop, speed } = data;
let vol = Number(volume)||vnjs.conf.volume;
_assets[name].volume =  vol/1000;


//sound.togglePauseAll()
_assets[name].speed = speed||1;
_assets[name].loop = loop||false;

if(action==="pause"){
	PIXI.sound.togglePauseAll();
}
else if(action==='stop'){
	PIXI.sound.stopAll();
}
else if(action==='mute'){
	PIXI.sound.toggleMuteAll();
}
else{
	_assets[name].play();
	prevAudio = name;
}

}
}


function vnjsonClear(stage){
if(stage){
	let i = _screens[stage].children.length-1;
	for (i; i>=0; i--){
		_screens[stage].removeChild(_screens[stage].children[i]);
	};
}
else{
		let i = app.stage.children.length-1;
		for (i; i>=0; i--) {	
			app.stage.removeChild(app.stage.children[i]);
		};	
	}
}
function vnjsonBlur (ctx){

let sprite = _assets[ctx];

const blurFilter1 = new PIXI.filters.BlurFilter();


sprite.filters = [blurFilter1];

let count = 0;

app.ticker.add(() => {
    count += 0.015;

    const blurAmount = Math.cos(count);
    const blurAmount2 = Math.sin(count);

    sprite.blur = 20 * (blurAmount);
    //blurFilter2.blur = 20 * (blurAmount2);
});
}

/*
filter.contrast(0.5, true);
filter.desaturate();
filter.greyscale(0.4, false);
filter.hue(180, false);
filter.negative(true);
filter.saturate(2, false);
filter.sepia(false);
filter.technicolor(true);
filter.browni(true);
filter.kodachrome(true);
filter.toBGR(true);
*/


function gameMenu(menu){
	vue.$data.screen = "gamemenu";
	setTimeout(drawMenu, 0);

function drawMenu(){

vnjs.$.menu_items.innerHTML = "";
	for(let [menuItem, label] of Object.entries(menu)){
		
		if(menuItem==='?'){
			vnjs.$.menu_quetion.innerHTML = label;
		}else{

			let strmenu = `<div data-label="${ label }" class="menu-item">${menuItem}</div>`;
			vnjs.$.menu_items.innerHTML +=strmenu;
		}
	};

	}



}

var scoresData = 0;
function point(data){

	scoresData = scoresData+data;

	scoresEl.innerHTML = `scores: ${scoresData}`;
	
};


function vnjsonPrint(reply, color){
vnjs.$.signal.style.display = 'none';
vnjs.$.reply.innerHTML = "";
vnjs.$.reply.style.color = color;

if(vnjs.conf.typespeed==='0'){
		vnjs.$.reply.innerHTML = reply;
}
else{
	
var arr = reply.split("");

var str = arr.map(character=>{
							return `<span class="char-letter">${character}<span>`
					}).join("");

vnjs.$.reply.innerHTML = str;

////////////////
var charsArr = document.querySelectorAll('.char-letter');
var i = 0;

function typeWrite(){

if(charsArr.length<=i){


 clearTimeout(timeoutID);
 vnjs.$.signal.style.display = 'inline-block';
}else{

	charsArr[i].style.opacity = 1;
	i++;
	var timeoutID = setTimeout(typeWrite, vnjs.conf.typespeed)
}
}
typeWrite();
}
};

function vnjsonCharacter (character, reply){




vnjs.$.name.innerHTML = character.text;
vnjs.$.name.style.color = character.color
	vnjsonPrint(reply, character.color)


}



function vnjsonRotate(name){
	let sprite = _assets[name];

app.ticker.add((delta) => {
    sprite.rotation += 0.01 * delta;
});

}

function vnjsonScale(name){
	//let sprite = _assets[name];
	//sprite.scale.set(2,2);
}
function vnjsonScene (name){

	let sprite = _assets[name];


	//snake
	//"left":"+=8px"
	//"left":"-=8px"
	//"left":"+=8px"
	//"left":"-=8px"
//blink
//"top":"+=5px"
//"top":"-=5px"

_screens.scene.addChild(sprite);	


}
function assetsLoader(scene){

const loader = new PIXI.Loader();

loader.onStart.add(() => {
	vnjs.emit('preload', scene);
});
loader.add(scene.assets).load();

loader.onLoad.add((loader, res) => {

			if(res.extension==='mp3'){

				_assets[res.name] = res.sound;
			}else{
				_assets[res.name] = new PIXI.Sprite(res.texture);
			}
			vnjs.emit('load', `${Math.round(loader.progress)}%`, res.url);

		}); 

loader.onComplete.add(() => {
	vnjs.emit('postload', scene);
});


};
function vnjsonShow(param){
	let { x, y, name } = param;
	let sprite = _assets[param.name];
			sprite.x = `${x}px`;
			sprite.y = `${y}px`;
		//	sprite.alpha = 0;
_screens.show.addChild(sprite);

}


function vnjsonLeft (name){
var ticker = PIXI.Ticker.shared;
var sprite = null;
function animation (delta){
	if(sprite.alpha!==1)
					sprite.alpha += 0.05;
}

if(name==='clear'){
	sprite = _assets[vnjs.current.screen.left];
	ticker.stop()
  sprite.alpha = 0;

}
else{
			vnjs.current.screen.left = name;
			sprite = _assets[name];
			sprite.anchor.set(0.5);
			sprite.alpha = 0;
			sprite.x = 90;
			sprite.y = app.screen.height / 2;
			_screens.show.addChild(sprite);
			ticker.add(animation);
			ticker.start()
}
}

function vnjsonRight (name){

var ticker = PIXI.Ticker.shared;
var sprite = null;
function animation (delta){
	if(sprite.alpha!==1)
					sprite.alpha += 0.05;
}

if(name==='clear'){
	sprite = _assets[vnjs.current.screen.right];
	ticker.stop()
  sprite.alpha = 0;

}
else{
			vnjs.current.screen.right = name;
			sprite = _assets[name];
			sprite.anchor.set(0.5);
			sprite.alpha = 0;
			sprite.x = app.screen.width-90;
			sprite.y = app.screen.height / 2;
			_screens.show.addChild(sprite);

			ticker.add(animation);
			ticker.start()
	}		
}

function vnjsonCenter (name){
var ticker = PIXI.Ticker.shared;
var sprite = null;
function animation (delta){
	if(sprite.alpha!==1)
					sprite.alpha += 0.05;
}

if(name==='clear'){
	sprite = _assets[vnjs.current.screen.center];
	ticker.stop()
  sprite.alpha = 0;

}
else{
			vnjs.current.screen.center = name;
					sprite = _assets[name];
					sprite.anchor.set(0.5);
					sprite.alpha = 0;
					sprite.x = app.screen.width / 2;
					sprite.y = app.screen.height / 2;

			_screens.show.addChild(sprite);

			ticker.add(animation);
			ticker.start()
}
}