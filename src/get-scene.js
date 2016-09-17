vnjs.getScene = function(scene){
	/* qwest - it is small ajax lib */
	qwest.get('./game/scenes/'+vnjs.game.init.config.local+"/"+scene+'.json', null, {dataType:'json'})
	.catch(function(err){
		console.error('Ошибка при загрузке сцены',err);
	})
	.then(function(xhr, res){
		/**
		 * @Set {scene} to {game}
		 */
		vnjs.game.scenes[scene] = new Object();
		vnjs.game.scenes[scene] = res;
		/**
 		 * @conat characters whith plugins
		 */
		vnjs.catalog = vnjs.catalog.concat(vnjs.game.scenes[scene].characters);
		console.info(scene+"/"+vnjs.current.label);

	}).complete(function(){
		vnjs.parse();
		document.getElementById('scene')
		.addEventListener('mousedown',function(){
			vnjs.parse();
		});
	});
};
