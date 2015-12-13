ren.getScene = function(scene,label){

var labelContent = ['scenes',scene,'labels',label].join('/').concat('.json5');
var characters = ['scenes',scene,'characters.json5'].join('/');
var preload =  ['scenes',ren.current.scene,'preload.json5'].join('/');

$.when(
	$.get(labelContent),
	$.get(characters),
	$.get(preload)
).then(function(labelContent,characters,preload){

	ren.game.scenes[scene] = {};
	ren.game.scenes[scene][label] = labelContent[0];

	ren.game.characters[scene] = {};
	ren.game.characters[scene] = characters[0];
	ren.game.preload[scene] = {};
	ren.game.preload[scene] = preload[0];
	//concat keys
	ren.extend();	
}).then(function(){
	/**
	@type {array}
	*/
	ren.current.array = ren.game.scenes[ren.current.scene][ren.current.label];
	
	ren.parse();
	$(ren.parent).on('click',function(){
		ren.parse();
		
	});
});




};


/*ren.switch = true;
ren.getScene = function(){
	ren.game.scenes = ren.game.scenes||{};
	$.get("game/"+ren.label+".json5",function(data){
	
		ren.game.scenes[ren.label] = JSON5.parse(data);

		console.log('ren.switch: ' +ren.switch);
		if(ren.switch){
			
			ren.parse('current');
			ren.switch = false;
		}
		else {
			ren.parse('prev');
			//ren.switch = 'next';
		}
		
	});

};*/