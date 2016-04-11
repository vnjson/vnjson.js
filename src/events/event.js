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
		$('#center')
			.css('background-image','url(./game/assets/'+value+'.png)');
	},
	show:function(value){
		$('#center')
			.css('background-image','url(./game/assets/'+value+'.png)');
	},	
	left:function(value){
		$('#left')
			.css('background-image','url(./game/assets/'+value+'.png)');

	},
	right:function(value){
		$('#right')
			.css('background-image','url(./game/assets/'+value+'.png)');

	},
	audio:function(value){
		var song = "./game/assets/"+value+".mp3";
		var sound = new Howl({
  			urls: [song],
  			autoplay:true,
  			loop:true
		}).play();
	},
	sound:function(value){
		var song = "./game/assets/"+value+".mp3";
		var sound = new Howl({
  			urls: [song],
  			autoplay:true
		}).play();
	},
	scene:function(value){

		$('#scene')
			.css('background-image','url(./game/assets/'+value+'.png)');
	},
	shake:function(elem) {
		$("#"+elem).animate({"left":"+=8px"}, 50)
					.animate({"left":"-=8px"}, 50)
					.animate({"left":"+=8px"}, 50)
					.animate({"left":"-=8px"}, 50);
      },
	bump:function(elem) {
		$("#"+elem).animate({"bottom":"+=8px"}, 50)
                    .animate({"bottom":"-=8px"}, 50)
                    .animate({"bottom":"+=8px"}, 50)
                    .animate({"bottom":"-=8px"}, 50);
	}

};

