vnjs.on = function(event, handler, flag){
	var tmpObj = {
		event: event,
		handler: handler,
		autorun: flag || false
	};
	this.catalog.push(tmpObj);

};
