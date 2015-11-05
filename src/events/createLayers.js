ren.createLayers = function(){

this.game.layers.forEach(function(layer){
	$('#'+layer.parent).append('<section id='+layer.id+'></section>')
	$("#"+layer.id).css(layer.style);
	ren.layers[layer.id] = layer.style;

})

	$('#scene').bind("mousedown",function(){
		ren.parse('next');
	});

}