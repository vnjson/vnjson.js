ren.init = function(){
var uri = {
	layers:'/game/layers',
	config:'/game/config'
};


if(ren.config.ext===".json5"){
	$.ajaxSetup({
		dataType:ren.config.dataType,
		dataFilter:function(data){
			return JSON5.parse(data);
		}
	});
	load(ren.config.ext);

}
else if(ren.config.ext===".yml"){
	$.ajaxSetup({
		dataType:ren.config.dataType,
		dataFilter:function(data){
			return  YALM.parse(data);
		}
	});
	load(ren.config.ext);
}

function load(ext){
	$.when(
		$.get(uri.layers+ext),
		$.get(uri.config+ext)
	).then(function(layers,config){
		ren.game.layers = layers[0];
		ren.game.config = config[0];

	//ren.createLayers();
	
	});	
}



};//ren.init()
