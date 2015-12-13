ren.init = function(){


$.ajaxSetup({
	dataType:"text",
	dataFilter:function(data){
		return JSON5.parse(data);
	}
});

$.when(
	$.get('/scenes/layers.json5'),
	$.get('/scenes/config.json5')
).then(function(layers,config){
	ren.game.layers = layers[0];
	ren.game.config = config[0];

ren.createLayers();

});

};//ren.init()
