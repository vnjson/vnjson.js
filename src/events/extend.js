ren.extend = function(){
	var characters= ren.game.scenes[ren.current.scene]['characters']
	/**
	*concat keywords
	@param {object} event - ren.event object
	@param {object} characters - game characters
	@type {object} event - total object
	@todo extentions, layers
	*/

	ren.event = $.extend(ren.event,characters);
};