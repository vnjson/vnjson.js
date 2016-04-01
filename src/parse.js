vn.parse = function(){
//console.info("parse")
//vn.route();


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