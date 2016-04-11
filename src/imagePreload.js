vn.imagePreload = function(images){
//	vn.current.Array
/*	var IM = new Array();
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
			//vn.event.jump(vn.game.options.startLabel)
			alert('Изображения загружены');
		}
	})*/
var i = 0;	
var len = image.length-1;
var IM = new Array();
images.forEach(function(src){
	/*
	 * Здесь нужно будет отсортировать
	 * audio/images
	 */
		IM.push('./game/scenes'+src);
	})

function counter(){
	i++;
	console.log(i+''+len);
}
$.imgpreload(images,{
    each: function(){
        counter();
        // this = dom image object
        // check for success with: $(this).data('loaded')
    },
    all: function(){
        vn.parse();
        console.log('Изображения загружены');
    }
});	

}