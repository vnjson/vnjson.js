RenJs.prototype.keywords['scene'] = function(scene){
	
	if(typeof(scene)==='string'){
		this.layers.scene.style.background = 'url('+this.game.images[scene]+')'
	}
	if(typeof(scene)==='object'){
		this.layers.scene.style.background = 'url('+this.game.images[scene.image]+')'
	}
}