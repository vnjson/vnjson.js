vn.isImage = function(data){
		var reg = /\.(png|jpg|jpeg)$/gi;
		return reg.test(data);
};

vn.isAudio = function(data){
		var reg = /\.(mp3|ogg|wav)$/gi;
		return reg.test(data);
}
