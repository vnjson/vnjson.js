

vnjs.on('start-game', function(){
  let { getScene, getScreen, emit, config, next } = this;
  /*
  * Во время первого запуска нужно
  * запустить точку входа.
  * Здесь это и присходит. Ставлю обработчик
  * события (jump) и передаю контекст
  */ 
  emit.call(vnjs, 'jump', config.entry);
  vnjs.on('loaded', function(){
        getScreen('layers.html', function(html){
            document.getElementById('game').innerHTML = html;
            next();
        });
  });


});



