RenJs.prototype.parse = function(){
	var label = this.game.labels[this.label]
	this.interator = label[this.i];
	var	key = null;

		this.i++;

//game.define + this.keywords
/* Склеиваю пользовательские ключевые слова с основными*/
function concat(keywords,functions){
var c = {},
	key;
	for (key in keywords) {
		c[key] = keywords[key];
	}
	for(key in functions){
		c[key] = functions[key]
	}
	return c;
}

var keywords = concat(this.keywords,this.game.define)

/*перебераю методы объекта interator {aliase:'pr',text:'hello'}*/
	for(key in this.interator){
		keywords[key].call(this,this.interator[key])
	}

/*Конец новеллы*/
//this.i===undefined/*>label.length*/&&alert('Конец')
}