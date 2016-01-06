ren.event = {
	name:function(character){
	
		$('#name-box')
			.html(character.name+': ')
			.css('color',character.color);

	
	},
	reply:function(text,character){	
		$('#text')
				.html(text)
				.css('color',character.color);
	},
 
	undefined:function(name,value){
		console.error("Обработчик "+ name +" не зарестрирован");
			
	},
	layer:function(id,param){
		
		//$('#'+id).css('background','url("'+ren.images[param]+'")');
		console.info("{"+id+":"+param+"}");
	},
	/*audio:function(val){
		if(val in ren.audio){


		var AudioSrc = ren.audio[val];
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
	}
	
	else{
		console.error('Параметр audio '+val+' не верен');

	}
	},*/


};

