
ren.init = function(){
//setup	
$.ajaxSetup({
	dataType:ren.config.dataType,
	dataFilter:function(data){
		return JSON.parse(data);
	},
	chache:ren.config.chache
});
//init load
$.ajax(ren.path.init)
	.done(function(data){

			ren.game = data;
			/**
			 * @param global object
			 * @param layers array
			 */
			
	})
	.fail(function(err){
			console.error(err);
	})
	.then(function(){
		ren.createLayers(ren.game.global,ren.game.layers);
		//ren.event.jump(startLabel);
	});

};//ren.init()
