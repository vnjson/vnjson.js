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