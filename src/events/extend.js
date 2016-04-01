vn.extend = function(){
	var characters= vn.game.characters;
	/**
	*concat keywords
	@param {object} event - vn.event object
	@param {object} characters - game characters
	@type {object} event - total object
	@todo extentions, layers
	*/

	vn.event = $.extend(vn.event,characters);
};