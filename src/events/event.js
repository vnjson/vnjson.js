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
		console.log('center: '+value);
	},
	audio:function(value){
		console.log("audio: "+value+".mp3");
	},
	sound:function(value){
		console.log("sound: "+value+".mp3");
	},
	scene:function(value){

		//console.warn(typeof value);//{ext:"jpg"}
		$('#scene')
			.css('background-image','url(./game/assets/'+value+'.png)');
	}

};

