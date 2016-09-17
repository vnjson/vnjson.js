
vnjs.init = function(){
	/* 
	 * @qwest - it is small ajax lib 
	 */
	qwest.get('./game/init.json', null, {dataType:'json'})
	.then(function(xhr, res){
		/**
		 * @start autorun
		 */
		vnjs.autorun();
		/**
 		 * @game[init.json]
		 */
		vnjs.game.init = res;
		/*
		 * @jump to start Label
		 */
		vnjs.jump(res.config.startLabel);
	
	});

	
};
