vnjs.on('start-game', function(){

document
  .querySelector("#dialog_box")
  .addEventListener('mousedown', this.next);
/*
let {ctx, game, catalog, parse } = this;
let dialogBox = document.querySelector('#dialog_box');
  
    let screen = document.querySelector(game.init.screen);
     parse(ctx, catalog);   
    dialogBox.addEventListener('mousedown', function(){
        parse(ctx, catalog);
    });*/
/*var fps = 15;
function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw,screen);
        // Drawing code goes here
    }, 1000 / fps);
};
draw();
console.log('fps: '+fps);*/
});