/*vn.imagePreload = function(){
	var IM = new Array();
	vn.game.images.forEach(function(image){
		IM.push('game/'+image);
	})
	$.imgpreload(IM,{
		each:function(){
			var src = $(this).attr('src');
			var imageName = vn.reg.getImage(src);
			vn.images[imageName] = src;
		
		},
		all:function(){
			//После того как загрузим все изображения
			//прыгаем к start.json5 и запускаем без клика.
			vn.event.jump(vn.game.options.startLabel)

		}
	})

}*/