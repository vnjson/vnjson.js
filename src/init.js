
ren.init = function(){
	$.when(
		$.get(ren.path.layers),
		$.get(ren.path.config)
	).then(function(layers,config){
				ren.game.layers = layers[0];
				ren.game.config = config[0];
	}).then(function(){
				/**
				@param parent 
				@param start
				*/
				ren.createLayers(ren.game.config.parent,ren.game.config.startLabel);
	});

};//ren.init()
