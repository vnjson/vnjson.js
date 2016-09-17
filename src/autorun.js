vnjs.autorun = function(){
	vnjs.catalog.forEach(function(obj){
		if(obj.hasOwnProperty('autorun')){
			if(obj.autorun===true){
				
				obj.handler(obj.event);
			}
		}
		
	});
};