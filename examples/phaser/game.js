
var mainScreen = {
      preload: function(){
         game.load.json('scene1', 'scene.json');
         game.load.image('dialog-box', './assets/dialog-box1.png');
         game.load.image('battle-field', './assets/battle-field.png');
      },
      create: function(){

        var scene1 = game.cache.getJSON('scene1');
       vnjs.ctx.label = "entry";
       vnjs.setScene('scene', scene1);
      
       game.add.image(0, 0, 'battle-field');

      function clickHandler(){
        vnjs.next()
      }
      game.add.button(0, 330, 'dialog-box', clickHandler);

       var name = game.add.text(30, 340, "",{ fill: '#ffffff' });
       var reply = game.add.text(30, 370, "", { fill: '#ffffff' });
           reply.maxWidth = 600;
       vnjs.on('character', function(data){
           name.setText(data.name);
           reply.setText(data.reply);
        });

      },

      update: function(){
       /* if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
              vnjs.next();
         }*/
      }
}




vnjs.on('alert', function(text){

  console.log(text);
});
 

document
    .getElementById('next')
    .addEventListener('mousedown', function(e){
      vnjs.next();
    });


var gameover = {
      preload: function(){
        game.load.image('gameover', './assets/gameover.png');

      },
      create: function(){
        game.add.image(0, 0, 'gameover');
        game.add.text(200, 150, "GAME OVER", { fill: 'green' });
        console.log('[ game over ]')
      },
      update: function(){

      }
}





var game = new Phaser.Game(800, 480, Phaser.CANVAS, 'game', mainScreen);

vnjs.on('pr',function(reply){
  let { emit } = this;
  emit('character', {name: 'Профессор', color:'red', reply });
});

vnjs.on('al', function(reply){
  let { emit } = this;
  emit('character', {name: 'Алиса', color:'blue', reply });
});

vnjs.on('state', function(screen){
 game.state.start(screen);
});

game.state.add('gameover', gameover);