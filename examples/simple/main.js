

var scene = { 
      assets: [],
      entry: [
          { print: 'Hello' },
          { print: 'world'},
          { jump: 'chapter1' }
      ],
      chapter1: [
        { print: '11hello chapter1' },
        { prof: 'Проверка новой системы реплик песконажей'},
        { alice: 'Что бы увеличить скорость выполнения парсинга labela'},
        { print: 'Game over'}
      ]
      
  };




vnjs.on('character', function(data){
  let { name, color, reply } = data;
  console.log(name+": " + reply);
});

vnjs.on('prof', function(reply){
  this.emit('character', {name: 'Профессор', color:'red', reply })

});

vnjs.on('alice', function(reply){
  this.emit('character', { name: 'Алиса', color: 'green', reply })
});
/*
 * init
 */
window.onload = function(){
 
vnjs.setLabel('entry');
vnjs.setScene('scene', scene);

document
  .querySelector('#next')
  .addEventListener('mousedown', function(e){

      vnjs.next();
  });

}



