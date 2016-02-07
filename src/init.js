
ren.init = function(){

$.get('/game/layers.html',function(layers){
	$(ren.config.parent).append(layers);
});

//init load
$.ajax({
	url:ren.path.init,
	dataType:"json",
	success:function(data){
		ren.game = data;
	},
	error:function(err){
		console.error(err);
	}
});


};//ren.init()
