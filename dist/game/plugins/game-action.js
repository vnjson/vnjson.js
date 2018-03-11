

vnjs.on('game-action', function(){


  this.parse({ jump: 'scene2/chapter1' });
  //this.on('postload', _=>{ this.parse() })
vnjs.on('character', function(data){
  const name = data.param.name;
  const color = data.param.color;
  //console.log(name+": ", data.reply);
  //let dialogBox = document.querySelector('.dialog-box');

  let nameBox = document.querySelector('.name-box');
      nameBox.style.color = color;
    nameBox.innerHTML = name;
  let reply = document.querySelector('.reply');
    reply.innerHTML = data.reply;
});


document.querySelector('.dialog-box')
        .addEventListener('click', e=>{
            this.next();
        });


});



vnjs.on('memory-card', function(elDOM){
 


for(let key in localStorage){
  elDOM.innerHTML += `<a href='#' data-key='${key}'>${key}</a><br>`;

}



})