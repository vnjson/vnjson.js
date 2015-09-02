ren.concatKeywords = function(){
	function concat(keywords,functions){
			var c = {};
			var key;
			for (key in keywords) {
				c[key] = keywords[key];
			}
			for(key in functions){
				c[key] = functions[key]
			}
			return c;
	}

//Склеиваю ключевые слова, с объявленными персонажами
/*var Keys = concat(this.keywords,this.game.characters);
	Keys = concat(Keys,this.game.define);
	Keys = concat(Keys,this._layers);*/
	/*
var _keys = [
	this.keywords,
	this.game.characters,
	this._layers,
	this.game.define,
	this.game.animation
];
*/
this.keys = concat(this.keys,this.keywords);
this.keys = concat(this.keys,this.game.characters);
this.keys = concat(this.keys,this.show_layers);
this.keys = concat(this.keys,this.game.define);
this.keys = concat(this.keys,this.game.animation);
/*
_keys.forEach(function(item){
	this.keys = concat(this.keys,item);
	console.log(this.keys)
});*/
/*
var i = 0;
var k = {}
 while(i>=_keys.length-1){
 	var keys = concat(k,_keys[i]);

 	i++;
 	if(i===_keys.length-1){
 		this.keys = keys
 	}
 }

/*
this.keys.prototype.add = function(obj){
			var c = {};
			var key;
			for (key in this) {
				c[key] = this[key];
			}
			for(key in obj){
				c[key] = obj[key]
			}
			this = c
			return this;
	}
}

*/
}