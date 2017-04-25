/**
 * @deps [ marmottajax]
 */

import parse            from './parse';


/**
 * init
 */
function init(param){
  
  game.init = param;

marmottajax('/game/layers.html').success(function(body) {
    document.getElementById('game').innerHTML = body;

    jump( game.init.entry);

});
 
};

/**
 * Глобальное хранилище вызываемых методов из
 * пользовательского скрипта
 * 
 */
var catalog = [
      { 
        event: 'jump',
        handler: jump
      }
];
/*
function callEvent (event, data){
  catalog.forEach((e)=>{
    if(e.hasOwnProperty('event')){
      if(event===e.event){
        e.handler(data);
      }
    }
    
  });
}
callEvent.call(vnjs,'jump', pathname)
*/
/**
 * @plugins
 * Регистратор пользовательских событий
 */
class Event {
  constructor(event, handler, flag){
    this.event = event;
    this.handler = handler;
    this.flag = flag;
  }
  add(){
    const _event = {
      event: this.event,
      handler: this.handler
    };
    catalog.push(_event);

  }
}; 
/*
 * @autorun
 * vnjs.on(function(){});
 */
var autorun = [];

function on(event, handler){

  if(event&&handler){
     let userEvent = new Event(event, handler);
     userEvent.add();
  }else if(event){
    autorun.push(event);
  }
};

/*
 * game
 */

var game = {
    init: {},
    scenes: {}
};
var config = {
      audio: true
};
/*
 * context
 * Значение объекта равно состоянию приложения.
 */
var ctx = {
  scene:'scene',
  label:'label',
  arr: [],
  obj: null,
  num: 0,
};







/**
 * @TODO Сделать разновидность jump'a
 * только что бы можно было переходить
 * на конкретную строку. jumpTo("start/chapter1/14")
 * А так же разобраться с навигатором. Что б. можно было
 * скролить новелу назад и вперед.
 */

function jump(pathname){
 /*
  * Если есть слэш в пути прыжка
  * то это сцена, значит надо подружать
  * ресурсы и т.д.
  */
let isScene = /\/\w+/gi.test(pathname);

if(isScene){

  const pathArr = pathname.split('/');
  ctx.num = 0;
  ctx.scene = pathArr[0];
  ctx.label  = pathArr[1];
 
  getScene(ctx.scene);

 
}
  /*
   * Если слэша нет, то это значит лабел.
   * поэтому не надо делать лишних телодвижений
   * а просто выполнить уже загруженный массив
   */
else{
 
   ctx.num = 0;
   ctx.label = pathname;
   ctx.arr = game.scenes[ctx.scene].labels[ctx.label];
   parse(ctx, catalog);
};
};

/*
 * getScene
 */

function getScene(scene){

const pathToScene = `game/${game.init.scenes}/${game.init.local}/${scene}.json`;

marmottajax({
    url: pathToScene,
    json: true
}).success(function(data) {
    // result

    game.scenes[ctx.scene] = data;

    const _SCENE = game.scenes[ctx.scene];
   
    
    ctx.arr = _SCENE.labels[ctx.label];
    ctx.assets = game.scenes[ctx.scene].assets;

    /** 
     * Склеиваю персонажей из сцены в каталог
     *
     */
    catalog = catalog.concat(_SCENE.characters);
    /**
      * autorun
      */
    autorun.forEach(function(item){
      item.call(vnjs);
    });
 });

};


/*
 * @api
 * @version 0.5.7
 */
export {
  on,
  ctx,
  init,
  game,
  catalog,
  getScene,
  parse,
  autorun,
  config
};