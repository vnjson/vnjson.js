/**

*/

/** @global */
var vn = {};

vn.game = {
	scenes:{},
	package:{},
	config:{},
	characters:{}
};
vn.route = function(){

location.hash = [
					'#!',
					vn.current.scene,
					vn.current.label,
					vn.current.Number
				].join('/');

};//vn.route()
vn.current = {
	Array: [],
	Object: {},
	Number: 0,
	scene: null,
	label: null
};
/**
 * @keywords
 */
vn.event = {
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
		$('#center')
			.css('background-image','url(./game/assets/'+value+'.png)');

	},
	left:function(value){
		$('#left')
			.css('background-image','url(./game/assets/'+value+'.png)');

	},
	right:function(value){
		$('#right')
			.css('background-image','url(./game/assets/'+value+'.png)');

	},
	audio:function(value){
		var song = "./game/assets/"+value+".mp3";
		var sound = new Howl({
  			urls: [song],
  			autoplay:true,
  			loop:true
		}).play();
	},
	sound:function(value){
		var song = "./game/assets/"+value+".mp3";
		var sound = new Howl({
  			urls: [song],
  			autoplay:true
		}).play();
	},
	scene:function(value){

		//console.warn(typeof value);//{ext:"jpg"}
		$('#scene')
			.css('background-image','url(./game/assets/'+value+'.png)');
	}

};


vn.event.jump = function(pathname){
console.info("jump: "+pathname);
vn.current.scene =  pathname.split('/')[0];
vn.current.label =  pathname.split('/')[1];
vn.current.Number = 0;
if(vn.game.scenes[vn.current.scene]){
	//console.warn('Сцена уже загружена');
	vn.current.Number =-1;
	vn.current.Array = vn.game.scenes[vn.current.scene][vn.current.label]
}
else{
	/**
	 * load scene resourse 	
	 * @param {string} scene - current scene
	 * @param {string} label - current label
	 */
	
	vn.getScene(vn.current.scene,vn.current.label);
}


};
vn.extend = function(){
	var characters= vn.game.characters;
	/**
	*concat keywords
	@param {object} event - vn.event object
	@param {object} characters - game characters
	@type {object} event - total object
	@todo extentions, layers
	*/

	vn.event = $.extend(vn.event,characters);
};
vn.getScene = function(scene,label){

var dir = vn.path.scenes;

//require(labelpath)
var scenePath = [dir,scene].join('/').concat('.json');
/**
 * Загружаю сцену
 */

$.get(scenePath,function(data){
		vn.game.scenes[scene] = data;
		vn.current.Array = data[label];
		vn.extend();
	//	vn.parse();
	/*data['preload'].forEach(function(item){
   "/assets/chasy.mp3",
    "/assets/hero_room.png"
	})	*/
vn.imagePreload(data['preload']);

});



	
};

vn.parse = function(){

if(vn.current.Array.length<=vn.current.Number){
	console.warn('end chapter');
}else{
	vn.route();
	vn.current.Object = vn.current.Array[vn.current.Number];	

	$.each(vn.current.Object,function(key,value){
			
			vn.keyMaster(vn.event[key],vn.current.Object[key],key);
	});

	vn.current.Number++;

}

};//vn.parse()
/*
vn.current.object = vn.current.array[vn.current.item];

*/

vn.keyMaster = function(key,value,name){
	//console.log( $.type(key) )
	switch(typeof key){
			case "object":
				vn.event["name"](key);
				vn.event["reply"](value, key);
			break;
			case "function":
				vn.event[name](value);
			break;
	}		
};
/*
vn.current.object = vn.current.array[vn.current.item];

	vn.current.item++;
	vn.route();
	if(vn.current.object===undefined){
		console.error('Конец сцены i:'+this.i);
	}
	else{
		//Перебираю методы текущего объекта и вызываю
		$.each(vn.current.object,function(key,value){
			func(vn.event[key],value,key);
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
					vn.event["name"](key);
					vn.event["reply"](value, key);
				}
				//Если это слой*layer
				else{
					vn.event["layer"](name, value);
		
				}

			break;
			case "function":
				key(value);
			break;
			case "undefined":

				vn.event["undefined"](name,value);
			break;

		}
	vn.dev();
*/
	



/*	vn.parse = function(param){
	
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

	
	vn.currentObject = vn.game.scenes[vn.label][vn.i];

	console.log(this.i)
	if(vn.currentObject===undefined){
		console.error('Конец сцены i:'+this.i);
	}
	else{
		//Перебираю методы текущего объекта и вызываю
		$.each(this.currentObject,function(key,value){
			func.call(vn,vn.event[key],value,key);
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
vn.path = {
	init:'./game/init.json',
	scenes:'./game/scenes'
};
vn.config = {
	chache:false,
	dataType:"text",
	parent:"#game"
};