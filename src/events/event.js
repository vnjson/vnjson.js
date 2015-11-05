ren.event = {
	name:function(character){
	
		$('#nameBox')
			.html(character.name+': ')
			.css('color',character.color);

	},
	reply:function(text,character){
		
		$('#dialogBox')
				.html(text)
				.css('color',character.color);
	},
	jump:function(label){
		
			ren.label = label;
			ren.i = 0;
			ren.getScene();
			
	},
	undefined:function(name,value){
		console.error("Обработчик "+ name +" не зарестрирован")
			
	},
	layer:function(id,param){
		
		$('#'+id).css('background','url("'+ren.images[param]+'")');

	},
	audio:function(val){
		if(val in ren.audio){


		var AudioSrc = ren.audio[val];
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
	}
	
	else{
		console.error('Параметр audio '+val+' не верен')

	}
	},


}

