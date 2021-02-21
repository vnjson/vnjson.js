
function vnjsonPrint(reply, color){
vnjs.$.signal.style.display = 'none';
vnjs.$.reply.innerHTML = "";
vnjs.$.reply.style.color = color;

if(vnjs.conf.typespeed==='0'){
		vnjs.$.reply.innerHTML = reply;
}
else{
	
var arr = reply.split("");

var str = arr.map(character=>{
							return `<span class="char-letter">${character}<span>`
					}).join("");

vnjs.$.reply.innerHTML = str;

////////////////
var charsArr = document.querySelectorAll('.char-letter');
var i = 0;

function typeWrite(){

if(charsArr.length<=i){


 clearTimeout(timeoutID);
 vnjs.$.signal.style.display = 'inline-block';
}else{

	charsArr[i].style.opacity = 1;
	i++;
	var timeoutID = setTimeout(typeWrite, vnjs.conf.typespeed)
}
}
typeWrite();
}
};

function vnjsonCharacter (character, reply){




vnjs.$.name.innerHTML = character.text;
vnjs.$.name.style.color = character.color
	vnjsonPrint(reply, character.color)


}


