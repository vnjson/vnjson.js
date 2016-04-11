vn.imagePreload = function(assets){


var IMGs = new Array();
/**
 * @ Отделяю .mp3 от .png
 */
assets.forEach(function(src){
	 if(vn.isImage(src)){
	 	IMGs.push(vn.path.game+src);
	 }
});

var i = 1;	
var len = IMGs.length;
function counter(){
	
	console.log(i+'/'+len);
	i++;
}

$.imgpreload(IMGs,{
    each: function(){
        counter();
    },
    all: function(){
    	console.info('Изображения загружены');
        vn.parse();
        
    }
});	

}