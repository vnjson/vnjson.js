ren.createLayers = function(){
	function create(layer){
		var el = document.createElement('section')
			el.id = layer.id;
			el.style.width = layer.width;
			el.style.height = layer.height;
			el.style.position = 'absolute';
			el.style.display = 'none';
			el.style.border = '3px dotted red';
			el.style.top = layer.top;
			el.style.left = layer.left;
			//el.innerHTML = layer.id;
			//el.style.color = 'red';
			this.layers[layer.parent].appendChild(el)
			this.layers[layer.id] = el;
			
	}
function reg(key){
	this.game.layers[key].id = key;
	create.call(this,this.game.layers[key]);
	/*
		регистрация обработчика объявленных слоев
	*/
	this.show_layers[key] = function(src){
		this.layers[key].style.background = 'url('+this.game.images[src]+')';
		this.layers[key].style.display = 'block';
	}
}

for(var key in this.game.layers){
			reg.call(this,key);
}


/*
________layers.js________

ren.layer['scene'] = {
	parent:this.game.options.el,
	width:600,
	height:400
}
ren.layer['show'] = {
	parent:"scene",
	width:150,
	height:300
}
ren.layer['dialogBox'] = {
	parent:"scene",
	width:600,
	height:100	
}
*/
}