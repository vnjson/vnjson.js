ren.parse = function(param){
		
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


	if(ren.currentObject===undefined){
		console.error('Конец сцены i:'+this.i);
	}
	else{
		//Перебираю методы текущего объекта и вызываю
		$.each(this.currentObject,function(key,value){
			func.call(ren,ren.event[key],value,key);
		});
	}
	



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

			break;
			case "function":
				key.call(this,value);
			break;
			case "undefined":
				this.event["undefined"].call(this,name,value);
			break;
		}

		
	}

}