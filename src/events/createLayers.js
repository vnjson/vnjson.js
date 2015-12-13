ren.createLayers = function(){
	ren.parent = "#"+ren.game.config.parent;

var Layers = {};
ren.game.layers.forEach(function(layer){
	if(layer.parent === "config.parent"){
		$(ren.parent).append('<section id='+layer.id+'></section>');
		$("#"+layer.id).css(layer.style);
		
	}
	else{
		$('#'+layer.parent).append('<section id='+layer.id+'></section>');
		$("#"+layer.id).css(layer.style);
		
	}
	ren.event[layer.id] = layer.style;

});

ren.event.jump(ren.game.config.startLabel);

};