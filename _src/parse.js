import aliase              from './catalog/aliase';
import ctx                 from './ctx';
import game                from './game';
import catalog             from './catalog';

function parse(){



	const scene = game.scenes[ctx.scene];
	const label = scene[ctx.label];
	const ctxObject = label[ctx.num++];
	ctx.obj = ctxObject;
	/**
 	 * @filter
	 */
	for(let param in ctxObject){
		catalog.map(function(obj){
			/**
			 * @Определяю тип объектов по их свойствам.
			 * т.е Персонаж это или Плагин
			 */

			if( obj.hasOwnProperty('aliase') ){
				if(obj.aliase === param){
					aliase(obj, ctxObject[param]);			
				}
			}else if( obj.hasOwnProperty('event') ){
				
				if(obj.event === param){
					obj.handler(ctxObject[param]);
				}
			}else{
				console.log('неизвесный элемент: '+ param);
			}
		});//map
	};

};




export default parse;