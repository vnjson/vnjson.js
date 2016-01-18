
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

			
	})
	.fail(function(err){
			console.error(err);
	})
	.then(function(){
		/**
		 * @param layers array
		 */
		ren.createLayers(ren.game.layers);

	});

};//ren.init()
