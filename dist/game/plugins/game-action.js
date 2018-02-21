

vnjs.on('game-action', function(){

  console.log('Игра началась')
  this.parse({ jump: 'scene2/chapter1' });
})