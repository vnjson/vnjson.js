
ren.init = function(){
var configPath = [ren.path.scenes,ren.path.config].join('/');
$.ajaxSetup({
	dataType:"text",
	dataFilter:function(data){
		return JSON.parse(data);
	},
	chache:false
})

$.ajax(configPath)
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
