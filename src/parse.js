import aliase              from './catalog/aliase';
import current             from './current';
import game                from './game';
import catalog             from './catalog';

function parse(){



	const scene = game.scenes[current.scene];
	const label = scene[current.label];
	const currentObject = label[current.num++];
	current.obj = currentObject;
	/**
 	 * @filter
	 */
	for(let param in currentObject){
		catalog.map(function(obj){
			/**
			 * @Определяю тип объектов по их свойствам.
			 * т.е Персонаж это или Плагин
			 */

			if( obj.hasOwnProperty('aliase') ){
				if(obj.aliase === param){
					aliase(obj, currentObject[param]);			
				}
			}else if( obj.hasOwnProperty('event') ){
				
				if(obj.event === param){
					obj.handler(currentObject[param]);
				}
			}else{
				console.log('неизвесный элемент: '+ param);
			}
		});//map
	};

};




export default parse;