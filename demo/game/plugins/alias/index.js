vnjs.alias = function(character, reply){
  let nameBox = document.getElementById('name_box');
  let textBox = document.getElementById('text_box');
  nameBox.innerHTML = character.name;
  nameBox.style.color = character.color;

 let {ctx, game, catalog, parse } = this;
    let screen = document.getElementById(game.init.screen);


      var speed = 0;
  var i = 0;

  
if(speed != 0){

textBox.innerHTML = "";

  function print(){
   /* screen.removeEventListener('mousedown',function(){
        parse(ctx, catalog);
    },false);*/
    textBox.innerHTML += reply[i];
    
    i++
  
    if(i>reply.length-1){
      clearInterval(intId);
      /*   screen.addEventListener('mousedown', function(){
        parse(ctx, catalog);
    }); */
    }

  }
  var intId = setInterval(print, speed);
  
}
else {
    textBox.innerHTML = reply;
} 
};