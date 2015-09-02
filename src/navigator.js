ren.navigator = function(){




this.handler = function(param){

	
		ren.parse(param);

}	



this.next = function(){
	this.handler('current');
	
	this.layers.scene.addEventListener('mousedown',this.handler);

		this.button['next'].addEventListener('mousedown',this.handler);

/*
if(ren.i===ren.scene.length-1){
	ren.parse('current')
}
else if(ren.i===0){
	ren.parse('current');
}
else {
	ren.parse(param);
}*/
}

this.prev = function(){
		this.button['prev'].addEventListener('mousedown',function(){
				ren.handler('prev');
	});

}

this.next();
if(this.game.options.reverse){
		this.prev();
}
}