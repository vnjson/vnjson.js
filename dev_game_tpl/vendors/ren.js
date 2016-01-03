/**
* @version 0.2.9
* @author kserks
* @license MIT license
*/

/** @global */
var ren = {
			ext:{},

};

/**
 * @todo Написать посимвольный вывод текста
 * @todo Сделать загрузчик сцен
 * @todo Анимация внутри dialog-box в конце текста.
 
 */

ren.game = {
	scenes:{},
	layers:{},
	config:{},
};
ren.current = {
	arr:[],
	obj:{},
	num:0,
	scene:null,
	label:null,
};
ren.config = {
	dataType:'text',
	ext:'.json5'
};
ren.init = function(){
var uri = {
	layers:'/game/layers',
	config:'/game/config'
};


if(ren.config.ext===".json5"){
	$.ajaxSetup({
		dataType:ren.config.dataType,
		dataFilter:function(data){
			return JSON5.parse(data);
		}
	});
	load(ren.config.ext);

}
else if(ren.config.ext===".yml"){
	$.ajaxSetup({
		dataType:ren.config.dataType,
		dataFilter:function(data){
			return  YALM.parse(data);
		}
	});
	load(ren.config.ext);
}

function load(ext){
	$.when(
		$.get(uri.layers+ext),
		$.get(uri.config+ext)
	).then(function(layers,config){
		ren.game.layers = layers[0];
		ren.game.config = config[0];

	//ren.createLayers();
	
	});	
}



};//ren.init()
