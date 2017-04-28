

vnjs.on('main-menu', function(e){
  let { getScreen, emit } = this;
getScreen('main-menu.html', function(html){
    document.getElementById('game').innerHTML = html;
    /*
     * Здесь срабатывает autorun
     */

    emit('autorun', {name: 'autorun'});
    /*
     * Слушаем пункты меню.
     */
     let startGame = document.querySelector("#start-game");
      startGame.addEventListener('mousedown', function(){
           /*
            * Во время первого запуска нужно
            * запустить точку входа.
            * Здесь это и присходит. Ставлю обработчик
            * события (jump) и передаю контекст
            */
            emit.call(vnjs, 'start-game');
            //emit.call(vnjs, 'jump', config.entry);
      });
    


});

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

})