RenJs.prototype.keywords['text'] = function(text){

	var speed = this.game.options.textSpeed;
	var i = 0;
	var _this = this;
	
if(speed != 0){
		this.layers.text_box.innerHTML = "";

		function print(){
		_this.layers.text_box.innerHTML += text[i];
		
		i++
		if(i>text.length-1){
			clearInterval(intId)
		}
	}
	var intId = setInterval(print,speed)	
}
else {
	this.layers.text_box.innerHTML = text;
}

}