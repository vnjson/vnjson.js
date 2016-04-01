

$(document).ready(function($){
$.get('./game/layers.html',function(layers){
	$(vn.config.parent).append(layers);
});

//init load
$.ajax({
	url: vn.path.init,
	dataType:"json",
	success:function(data){
		$.extend(vn.game,data);
		vn.event.jump(vn.game.config.startLabel);
	},
	error:function(err){
		console.error(err);
	}
});

$(vn.config.parent).on('mousedown',function(){
			vn.parse();
});

});