/*ren.imagePreload = function(){
	var IM = new Array();
	ren.game.images.forEach(function(image){
		IM.push('game/'+image);
	})
	$.imgpreload(IM,{
		each:function(){
			var src = $(this).attr('src');
			var imageName = ren.reg.getImage(src);
			ren.images[imageName] = src;
		
		},
		all:function(){
			//После того как загрузим все изображения
			//прыгаем к start.json5 и запускаем без клика.
			ren.event.jump(ren.game.options.startLabel)

		}
	})

}*/