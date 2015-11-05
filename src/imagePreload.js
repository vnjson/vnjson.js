ren.imagePreload = function(){
	
	$.imgpreload(ren.game.images,{
		each:function(){
			var src = $(this).attr('src');
			var imageName = ren.reg.getImage(src);
			ren.images[imageName] = src;
		
		},
		all:function(){
			//console.log("Все изображения загружены")

		}
	})

}