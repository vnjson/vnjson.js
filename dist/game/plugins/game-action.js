

vnjs.on('game-action', function(){


  this.parse({ jump: 'scene2/chapter1' });
  //this.on('postload', _=>{ this.parse() })






});



vnjs.on('memory-card', function(elDOM){
 


for(let key in localStorage){
  elDOM.innerHTML += `<a href='#' data-key='${key}'>${key}</a><br>`;

}



})