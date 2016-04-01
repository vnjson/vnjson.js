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
		console.debug('center: '+value);
	},
	audio:function(value){
		console.debug("audio: "+value);
	},
	scene:function(value){
		console.debug("scene: "+value);
	}

};

