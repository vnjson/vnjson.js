

vnjs.on('game-action', function(){


  this.parse({ jump: 'scene2/chapter1' });
  //this.on('postload', _=>{ this.parse() })
vnjs.on('character', function(data){
  const name = data.param.name;
  //console.log(name+": ", data.reply);
  
  let nameBox = document.querySelector('.name-box');
    nameBox.innerHTML = name;
  let reply = document.querySelector('.reply');
    reply.innerHTML = data.reply;
});

});