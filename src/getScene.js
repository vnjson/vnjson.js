ren.getScene = function(scene,label){
var dir = ren.path.scenes;


var labelPath = [dir,scene,label].join('/').concat('.json');

/*
$.get(labelPath,function(data){
	
			ren.game.scenes[scene] = data;
			console.log(ren.game.scenes)
			
			console.log(data)
})	
*/
$.ajax({
	url:labelPath,
	dataType:"json",
	type:"GET"
})
.done(function(data){
		console.log(data)
	})
.fail(function(error){
	console.group(labelPath);
	console.error("Ошибка загрузки сцены");
})
	
};
