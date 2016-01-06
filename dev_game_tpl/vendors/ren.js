/**
* @version 0.3.3
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
	config:{},
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
	Array:[],
	Object:{},
	Number:0,
	scene:null,
	label:null,
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
var dir = ren.path.scenes;


var labelPath = [dir,scene,label].join('/').concat('.json');

/*
$.get(labelPath,function(data){
	
			ren.game.scenes[scene] = data;
			console.log(ren.game.scenes)
			
			console.log(data)
})	
*/
$.ajax({
	url:labelPath,
	dataType:"json",
	type:"GET"
})
.done(function(data){
		console.log(data)
	})
.fail(function(error){
	console.group(labelPath);
	console.error("Ошибка загрузки сцены");
})
	
};

ren.parse = function(){

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
ren.path = {
	scenes:'/scenes',
	config:'config.json',
};
ren.config = {

};

ren.init = function(){
var configPath = [ren.path.scenes,ren.path.config].join('/');


$.ajax({
	url:configPath,
	dataType:"json",
	type:"get"
})
	.done(function(data){
			ren.game.config = data;
	})
	.fail(function(err){
			console.error(err);
	})
	.then(function(){
		var startLabel = ren.game.config.startLabel;
		ren.event.jump(startLabel);
	});

};//ren.init()
