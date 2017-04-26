vnjs.on('alias', function(data){
  let { character, reply, key } = data;
  let nameBox = document.getElementById('name_box');
  let textBox = document.getElementById('text_box');
  nameBox.innerHTML = character.name;
  nameBox.style.color = character.color;
  textBox.innerHTML = reply;
});
/*
 let {ctx, game, catalog, parse } = this;
    let screen = document.getElementById(game.init.screen);


      var speed = 0;
  var i = 0;

  
if(speed != 0){

textBox.innerHTML = "";

  function print(){
   /* screen.removeEventListener('mousedown',function(){
        parse(ctx, catalog);
    },false);
    textBox.innerHTML += reply[i];
    
    i++
  
    if(i>reply.length-1){
      clearInterval(intId);
      /*   screen.addEventListener('mousedown', function(){
        parse(ctx, catalog);
    }); 
    }

  }
  var intId = setInterval(print, speed);
  */
//}
//else {
   
//} 
