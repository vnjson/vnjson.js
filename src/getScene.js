vn.getScene = function(scene,label){

var dir = vn.path.scenes;

//require(labelpath)
var scenePath = [dir,scene].join('/').concat('.json');
/**
 * Загружаю сцену
 */

$.get(scenePath,function(data){
		vn.game.scenes[scene] = data;
		vn.current.Array = data[label];
		vn.extend();
		vn.parse();
		

});



	
};
