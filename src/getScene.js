ren.switch = true;
ren.getScene = function(){
	ren.game.scenes = ren.game.scenes||{};
	$.get("game/scenes/"+ren.label+".json5",function(data){
		
		ren.game.scenes[ren.label] = JSON5.parse(data);

		console.log('ren.switch: ' +ren.switch)
		if(ren.switch){
			
			ren.parse('current');
			ren.switch = false;
		}
		else {
			ren.parse('prev');
			//ren.switch = 'next';
		}

		
	});

}