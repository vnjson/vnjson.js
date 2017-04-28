

vnjs.on('main-menu', function(e){
  let { getScreen, emit, parse } = this;
/*getScreen('main-menu.html', function(html){
    document.getElementById('scene').innerHTML = html;
    /*
     * Здесь срабатывает autorun
     */

    emit('autorun', {name: 'autorun'});
    /*
     * Слушаем пункты меню.
     */
document
  .querySelector("#start-game")
  .addEventListener('mousedown', function(){
      parse({
            "screen": "start-game"
          });
           /*
            * Во время первого запуска нужно
            * запустить точку входа.
            * Здесь это и присходит. Ставлю обработчик
            * события (jump) и передаю контекст
            */
            //emit.call(vnjs, 'start-game');
            //emit.call(vnjs, 'jump', config.entry);
      });
      /*
        startGame.addEventListener('mouseove', function(){
            howler.play();
        })
      */
    
document
  .querySelector("#about")
  .addEventListener('mousedown', function(){
          parse({
            "screen": "about"
          });
      });
document
  .querySelector("#memory-card")
  .addEventListener('mousedown', function(){
          parse({
            "screen": "memory-card"
          });
      });


document
  .querySelector("#settings")
  .addEventListener('mousedown', function(){
          parse({
            "screen": "settings"
          });
      });

//}); //getScreen
}); //vnjs.on('main-menu')

vnjs.on('about', function(){
    this.parse({'scene':"about"});
});

vnjs.on('memory-card', function(){
    this.parse({"scene":"memory-card"});
});

vnjs.on('settings', function(){
    this.parse({"scene":"settings"});
});

vnjs.on('start-game', function(){
  let { emit, config, next } = this;
  emit.call(this, 'jump', config.entry);
  vnjs.on('loaded', next);
});
/**
 * userscript
 */
  vnjs.on('game-over', function(){
    this.parse({"scene": "gameover"});
  })

/** ########
 Механизм screen

в vnjson-cli&&sdk в плагинах все лежит в папке плагина

+ plugin
  - index.js
  - main-menu.html
  - main-menu.css  
/////

А когда происходит трансляция в конечный вид новеллы
то все уже лежит по папкам
 +screens/
  - main-menu
 +styles
  - bundle.css
 +plugins
  - bundle.js  

*/

