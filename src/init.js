
ren.init = function(){

$.get('./game/layers.html',function(layers){
	$(ren.config.parent).append(layers);
});

//init load
$.ajax({
	url:ren.path.init,
	dataType:"json",
	success:function(data){
		$.extend(ren.game,data);
		ren.event.jump(ren.game.config.startLabel);
	},
	error:function(err){
		console.error(err);
	}
});
$(ren.config.parent).on('click',function(){
			ren.parse();
		});

};//ren.init()
