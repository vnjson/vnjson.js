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