/**
* @version 0.3.4
* @author kserks
* @license MIT license
*/

/** @global */
var ren = {};

/**
 * @todo Написать посимвольный вывод текста
 * @todo Сделать загрузчик сцен
 * @todo Анимация внутри dialog-box в конце текста.
 * @todo Сделать memoryCard
 */

ren.game = {
	scenes:{},
	layers:{},
	package:{},
	config:{},
	global:{},
	characters:{}
};
ren.route = function(){

location.hash = [
					'#!',
					ren.current.scene,
					ren.current.label,
					ren.current.Number
				].join('/');

};//ren.route()
ren.current = {
	Array: [],
	Object: {},
	Number: 0,
	scene: null,
	label: null
};
ren.event = {
	name:function(character){
	
		$('#name-box')
			.html(character.name+': ')
			.css('color',character.color);

	
	},
	reply:function(text,character){	
		$('#text')
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
ren.current.Number = 0;
if(ren.game.scenes[ren.current.scene]){
	console.warn('Сцена уже загружена');
}
else{
	/**
	 * load scene resourse 	
	 * @param {string} scene - current scene
	 * @param {string} label - current label
	 */
	ren.getScene(ren.current.scene,ren.current.label);

}


};
ren.extend = function(){
	var characters= ren.game.scenes[ren.current.scene]['characters']
	/**
	*concat keywords
	@param {object} event - ren.event object
	@param {object} characters - game characters
	@type {object} event - total object
	@todo extentions, layers
	*/

	ren.event = $.extend(ren.event,characters);
};
ren.createLayers = function(layers){
	/**
	 * Задаю стили родительскому элементу
	 */
$(ren.config.parent).append("<canvas id='vn' ></canvas");
var canvas = document.getElementById('vn');
canvas.style.border ="2px dotted grey";
canvas.width = 600;
canvas.height = 400;

var ctx = canvas.getContext("2d");

function creatLayer(layer){
	ctx.fillStyle = layer.style.backgroundColor;
	ctx.fillRect(layer.style.x,layer.style.y,canvas.width,canvas.height);
}

//
/**
LAYERS[].pusth()
update();

*/
//scene.children[<dbox>]

			//ren.event.jump(startLabel);
};
ren.getScene = function(scene,label){
var dir = ren.path.scenes;

//require(labelpath)
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

ren.parse = function(){

if(ren.current.Array.length<=ren.current.Number){
	console.warn('end chapter');
}else{
	ren.route();
	ren.current.Object = ren.current.Array[ren.current.Number];	

	$.each(ren.current.Object,function(key,value){
			
			ren.keyMaster(ren.event[key],ren.current.Object[key],key);
	});

	ren.current.Number ++

}

}//ren.parse()

ren.keyMaster = function(key,value,name){
	//console.log( $.type(key) )
	switch(typeof key){
			case "object":
				ren.event["name"](key);
				ren.event["reply"](value, key);
			break;
	}		
}
/*
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
	//.isCharacter()
	//.isFn()
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
*/
	



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
ren.path = {
	init:'/game/init.json',
};
ren.config = {
	chache:false,
	dataType:"text",
	parent:"#game"
};

ren.init = function(){

$.get('/game/layers.html',function(layers){
	$(ren.config.parent).append(layers);
});

//init load
$.ajax({
	url:ren.path.init,
	dataType:"json",
	success:function(data){
		ren.game = data;
	},
	error:function(err){
		console.error(err);
	}
});


};//ren.init()
