ren.getScene = function(scene,label){

var dir = ren.path.scenes;

//require(labelpath)
var scenePath = [dir,scene].join('/').concat('.json');
/**
 * Загружаю сцену
 */
$.get("./"+scenePath,function(data){
		ren.game.scenes[scene] = data;
		ren.current.Array = data[label];
		ren.extend();
		ren.parse();
		

});



	
};
