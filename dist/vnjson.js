/**
* @version 0.3.7
* @author kserks
* @license MIT license
*/

/** @global */
var ren = {};

ren.game = {
	scenes:{},
	package:{},
	config:{},
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
		$('#name_box')
			.html(character.name)
			.css('color',character.color);
	},
	reply:function(text,character){	
		$('#text_box')
				.html(text)
				.css('color',character.color);
	},
 
	undefined:function(name,value){
		console.error("Обработчик "+ name +" не зарестрирован");
			
	},
	center:function(value){
		console.debug('center: '+value);
	},
	audio:function(value){
		console.debug("audio: "+value);
	},
	scene:function(value){
		console.debug("scene: "+value);
	}

};


ren.event.jump = function(pathname){
console.info("jump: "+pathname);
ren.current.scene =  pathname.split('/')[0];
ren.current.label =  pathname.split('/')[1];
ren.current.Number = 0;
if(ren.game.scenes[ren.current.scene]){
	//console.warn('Сцена уже загружена');
	ren.current.Number =-1;
	ren.current.Array = ren.game.scenes[ren.current.scene][ren.current.label]
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
	var characters= ren.game.characters;
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

//require(labelpath)
var scenePath = [dir,scene].join('/').concat('.json');
/**
 * Загружаю сцену
 */
$.get("./"+scenePath,function(data){
		ren.game.scenes[scene] = data;
		ren.current.Array = data[label];
		ren.extend();
		ren.parse();
		

});



	
};

ren.parse = function(){
//console.info("parse")
//ren.route();


if(ren.current.Array.length<=ren.current.Number){
	console.warn('end chapter');
}else{
	ren.route();
	ren.current.Object = ren.current.Array[ren.current.Number];	

	$.each(ren.current.Object,function(key,value){
			
			ren.keyMaster(ren.event[key],ren.current.Object[key],key);
	});

	ren.current.Number++;

}

};//ren.parse()

ren.keyMaster = function(key,value,name){
	//console.log( $.type(key) )
	switch(typeof key){
			case "object":
				ren.event["name"](key);
				ren.event["reply"](value, key);
			break;
			case "function":
				ren.event[name](value);
			break;
	}		
};
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
	scenes:'/game/scenes'
};
ren.config = {
	chache:false,
	dataType:"text",
	parent:"#game"
};

ren.init = function(){

$.get('./game/layers.html',function(layers){
	$(ren.config.parent).append(layers);
});

//init load
$.ajax({
	url:ren.path.init,
	dataType:"json",
	success:function(data){
		$.extend(ren.game,data);
		ren.event.jump(ren.game.config.startLabel);
	},
	error:function(err){
		console.error(err);
	}
});
$(ren.config.parent).on('click',function(){
			ren.parse();
		});

};//ren.init()
