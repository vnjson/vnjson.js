ren.run = function(game){

	this.game = game;
	
	this.appendChilds();
	this.createLayers();
	this.label = this.game.options.startLabel;
	this.concatKeywords();
	this.navigator();
	this.memoryCard();
	
}