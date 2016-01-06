ren.getScene = function(scene,label){
var dir = ren.path.scenes;


var labelPath = [dir,scene,label].join('/').concat('.json');
/**
 * Загружаю сцену
 */
$.get(labelPath,function(data){
		ren.game.scenes[scene] = data;
		ren.current.Array = data[scene];
		ren.extend();
		ren.parse();
		$(ren.game.config.parent).on('click',function(){
			ren.parse();
		})
});

	
};
