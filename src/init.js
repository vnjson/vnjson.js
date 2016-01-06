
ren.init = function(){
var configPath = [ren.path.scenes,ren.path.config].join('/');


$.ajax({
	url:configPath,
	dataType:"json",
	type:"get"
})
	.done(function(data){
			ren.game.config = data;
	})
	.fail(function(err){
			console.error(err);
	})
	.then(function(){
		var startLabel = ren.game.config.startLabel;
		ren.event.jump(startLabel);
	});

};//ren.init()
