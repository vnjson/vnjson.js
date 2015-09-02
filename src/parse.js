ren.parse = function(param){

	

switch(param){
	case 'prev':
		this.i--;
		break;
	case 'current':
		this.i = this.i;
		break;
	default:
		this.i++;
}
this.scene = this.game.labels[this.label];
//получаю текущий объект из массива label
this.iterator = this.scene[this.i];
//Перебираю	объект this.iterator на наличие ключевых слов
	for(var key in this.iterator){
		//Если это персонаж то:
		if(typeof this.keys[key]==='object'){
			if('name' in this.keys[key]){

				/*this is character*/
			this.keywords.character(this.game.characters[key]);
			this.keywords.phrase(this.iterator[key])
			}
		}
		//Если это функция то вызвыаются ключевые слова.
		if(typeof this.keys[key]==='function'){
			this.keys[key].call(this,this.iterator[key]);
		}

	}
}