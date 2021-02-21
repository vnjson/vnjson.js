


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

