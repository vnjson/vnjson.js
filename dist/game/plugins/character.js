vnjs.on('game-action', function(){

function print1(str){
var el =  document.querySelector('.reply');
var typeSpeed = 70;

var arr = str.split('')

var i = 0;
el.innerHTML = "";
function int(){
  if(i>=arr.length-1){
    clearInterval(tId);
     dBox.addEventListener('click', handler);
  }
 
  
  el.innerHTML += arr[i]
  i++;
}


var tId = setInterval(()=>{
  int()
}, typeSpeed);



dBox.removeEventListener('click', handler)

}

function handler(e){
  vnjs.next();
}





var dBox = document.querySelector('.dialog-box')
  dBox.addEventListener('click', handler);


vnjs.on('character', function(data){
  const name = data.param.name;
  const color = data.param.color;
  //console.log(name+": ", data.reply);
  //let dialogBox = document.querySelector('.dialog-box');

  let nameBox = document.querySelector('.name-box');
      nameBox.style.color = color;
    nameBox.innerHTML = name;
  let reply = document.querySelector('.reply');
   // reply.innerHTML = data.reply;
    print1(data.reply)
});




});//Необходимо для visible dom