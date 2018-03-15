vnjs.on('game-action', function(){

function print(str, callback){
var el =  document.querySelector('.reply');
var typeSpeed = 30;

var arr = str.split('')

var i = 0;
if(typeof str!='object'){
  el.innerHTML = "";
}

function int(){
  if(i>=arr.length-1){
    clearInterval(tId);
    callback();
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

   if(typeof data.reply==="object"){
    /*
     * pr: ['1', '2'] Вы водить текст не заново а продолжить
     */
       print(data.reply[0], ()=>{
          dBox.addEventListener('click', handler);
       })
   }else{
    print(data.reply, ()=>{
       dBox.addEventListener('click', handler);
    })
   }
   
});




});//Необходимо для visible dom