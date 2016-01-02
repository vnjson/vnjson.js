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
	characters:{},
	preload:{}

};
ren.route = function(){

location.hash = [
					'#',
					ren.current.scene,
					ren.current.label,
					ren.current.item
				].join('/');


};
ren.current = {
	array:[],
	object:{pr:'Привет Алиса',scene:'scene',jump:'lab/lab'},
	scene:null,
	label:null,
	item:0
};
ren.createLayers = function(){
	ren.parent = "#"+ren.game.config.parent;

var Layers = {};
ren.game.layers.forEach(function(layer){
	if(layer.parent === "config.parent"){
		$(ren.parent).append('<section id='+layer.id+'></section>');
		$("#"+layer.id).css(layer.style);
		
	}
	else{
		$('#'+layer.parent).append('<section id='+layer.id+'></section>');
		$("#"+layer.id).css(layer.style);
		
	}
	ren.event[layer.id] = layer.style;

});

ren.event.jump(ren.game.config.startLabel);

};
ren.event = {
	name:function(character){
	
		$('#nameBox')
			.html(character.name+': ')
			.css('color',character.color);

	
	},
	reply:function(text,character){	
		$('#dialogBox')
				.html(text)
				.css('color',character.color);
	},
 
	undefined:function(name,value){
		console.error("Обработчик "+ name +" не зарестрирован");
			
	},
	layer:function(id,param){
		
		//$('#'+id).css('background','url("'+ren.images[param]+'")');
		console.info("{"+id+":"+param+"}");
	},
	/*audio:function(val){
		if(val in ren.audio){


		var AudioSrc = ren.audio[val];
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
	}
	
	else{
		console.error('Параметр audio '+val+' не верен');

	}
	},*/


};


ren.event.jump = function(pathname){

ren.current.scene =  pathname.split('/')[0];
ren.current.label =  pathname.split('/')[1];
ren.current.item = 0;	
if(ren.game.scenes[ren.current.scene]){
	console.warn('Сцена уже загружена');
	//parse()
}
else{
	/**
	*load scene resourse 	
	@param {string} scene - current scene
	@param {string} label - current label
	*/
	ren.getScene(ren.current.scene,ren.current.label);

}


};
ren.extend = function(){
	var characters = ren.game.characters[ren.current.scene];
	/**
	*concat keywords
	@param {object} event - ren.event object
	@param {object} characters - game characters
	@type {object} event - total object
	@todo extentions, layers
	*/

	ren.event = $.extend(ren.event,characters);
};
ren.getScene = function(scene,label){

var labelContent = ['scenes',scene,'labels',label].join('/').concat('.json5');
var characters = ['scenes',scene,'characters.json5'].join('/');
var preload =  ['scenes',ren.current.scene,'preload.json5'].join('/');

$.when(
	$.get(labelContent),
	$.get(characters),
	$.get(preload)
).then(function(labelContent,characters,preload){

	ren.game.scenes[scene] = {};
	ren.game.scenes[scene][label] = labelContent[0];

	ren.game.characters[scene] = {};
	ren.game.characters[scene] = characters[0];
	ren.game.preload[scene] = {};
	ren.game.preload[scene] = preload[0];
	//concat keys
	ren.extend();	
}).then(function(){
	/**
	@type {array}
	*/
	ren.current.array = ren.game.scenes[ren.current.scene][ren.current.label];
	
	ren.parse();
	$(ren.parent).on('click',function(){
		ren.parse();
		
	});
});




};


/*ren.switch = true;
ren.getScene = function(){
	ren.game.scenes = ren.game.scenes||{};
	$.get("game/"+ren.label+".json5",function(data){
	
		ren.game.scenes[ren.label] = JSON5.parse(data);

		console.log('ren.switch: ' +ren.switch);
		if(ren.switch){
			
			ren.parse('current');
			ren.switch = false;
		}
		else {
			ren.parse('prev');
			//ren.switch = 'next';
		}
		
	});

};*/
ren.parse = function(){


ren.current.object = ren.current.array[ren.current.item];

	ren.current.item++;
	ren.route();
	if(ren.current.object===undefined){
		console.error('Конец сцены i:'+this.i);
	}
	else{
		//Перебираю методы текущего объекта и вызываю
		$.each(ren.current.object,function(key,value){
			func(ren.event[key],value,key);
			//console.log(key+": "+value);
		});
	}
};


function func(key,value,name){
	

		switch(typeof key){
			case "object":
				if('name' in key){
					ren.event["name"](key);
					ren.event["reply"](value, key);
				}
				//Если это слой*layer
				else{
					ren.event["layer"](name, value);
		
				}

			break;
			case "function":
				key(value);
			break;
			case "undefined":

				ren.event["undefined"](name,value);
			break;

		}
	ren.dev();

	
}


/*	ren.parse = function(param){
	
	//this.iterator(param);
switch(param){
	case 'prev':
		this.i--;
		break;
	case 'current':
		this.i = this.i;
		break;
	case 'next':
		this.i++;
}

	
	ren.currentObject = ren.game.scenes[ren.label][ren.i];

	console.log(this.i)
	if(ren.currentObject===undefined){
		console.error('Конец сцены i:'+this.i);
	}
	else{
		//Перебираю методы текущего объекта и вызываю
		$.each(this.currentObject,function(key,value){
			func.call(ren,ren.event[key],value,key);
		});
	}
	
*//*


	function func(key,value,name){
	

		switch(typeof key){
			case "object":
				if('name' in key){
					this.event["name"].call(this,key);
					this.event["reply"].call(this,value,key)
				}
				//Если это слой*layer
				else{
					this.event["layer"].call(this,name,value)
				};

			break
			case "function":
				key.call(this,value);
			break
			case "undefined":
				this.event["undefined"].call(this,name,value);
			break
		}

		
	}

}*/
ren.init = function(){


$.ajaxSetup({
	dataType:"text",
	dataFilter:function(data){
		return JSON5.parse(data);
	}
});

$.when(
	$.get('/scenes/layers.json5'),
	$.get('/scenes/config.json5')
).then(function(layers,config){
	ren.game.layers = layers[0];
	ren.game.config = config[0];

ren.createLayers();

});

};//ren.init()
