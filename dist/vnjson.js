

/** @global */

var vnjs = {
	catalog: [],
	game:{
		init:{},
		scenes:{}
	},
	current: {
		pathname:'scene/label',
		scene:'scene',
		label:'label',
		obj: null,
		num: 0,
	}
};



vnjs.on = function(event, handler, flag){
	var tmpObj = {
		event: event,
		handler: handler,
		autorun: flag || false
	};
	this.catalog.push(tmpObj);

};

vnjs.parse = function(){
	var scene = this.game.scenes[this.current.scene];
	var label = scene[this.current.label];
	var currentObject = label[this.current.num++];
	this.current.obj = currentObject;
	/**
 	 * @filter
	 */
	for(var param in currentObject){
		vnjs.catalog.forEach(function(obj){
			/**
			 * @Определяю тип объктов по их свойствам.
			 * т.е Персонаж это или Плагин
			 */

			if( obj.hasOwnProperty('aliase') ){
				if(obj.aliase === param){
					vnjs.aliase(obj, currentObject[param]);			
				}
			}else if( obj.hasOwnProperty('event') ){
				
				if(obj.event === param){
					obj.handler(currentObject[param]);
				}
			}else{
				console.log('неизвесный элемент: '+ param);
			}
		});//forEach
	};

};
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

vnjs.autorun = function(){
	vnjs.catalog.forEach(function(obj){
		if(obj.hasOwnProperty('autorun')){
			if(obj.autorun===true){
				
				obj.handler(obj.event);
			}
		}
		
	});
};

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
