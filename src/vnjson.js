/**
 * @deps [ marmottajax.js]
 *       [ minivents.js]
        
 */
var game = {
    init: {},
    scenes: {},
    characters: {},
    //choices: {},
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
/*
 * 
 */

var config = {};

var ev = new Events();//EventEmitter
var { emit } = ev;
/**
 * init
 */
function init(param){
  
  config = param;
  /*
   * Регистрирую плагин инициализвации
   */
  emit.call(vnjs, 'init');

 
};
/*
 * Обертка для погружения экранов
 */
function getScreen(fileName, callback){
    marmottajax(`/game/screens/${fileName}`).success(function(html) {
      callback(html);
  })
}

/**
 * @plugins
 * Регистратор пользовательских событий
 */



function on(event, handler){

  if(typeof event==="function"){
      ev.on('autorun', event, vnjs);
  }else if(typeof event==="string"){
      ev.on(event, handler, vnjs);
  }

};




/*
 * getScene
 */

function getScene(scene){
//window.location.href = config.basename;
const pathToScene = `/game/${config.scenes}/${config.local}/${scene}.json`;
/*
 * Излучаю событие preload что бы было можно повесить
 * идикатор загрузки на css
 */
emit('preload', {name:'preload', msg:'${scene} start loading!'})
marmottajax({
    url: pathToScene,
    json: true
}).success(function(data) {
    /*
     * Назначаем полученные данные сцены в
     * игровые объекты.
     * А так же объекты внутреннего назначения
     */
    game.scenes[ctx.scene] = data;

    const _SCENE = game.scenes[ctx.scene];
    /*
     * Добавляю персонажей в каждой загруженной сцены
     * в общий пулл.
     */
    game.characters = Object.assign(game.characters, _SCENE.characters);
    /*
     * Дублирую текущие значения в контекст
     */
    ctx.arr = _SCENE.labels[ctx.label];
    //ctx.assets = game.scenes[ctx.scene].assets;

    emit('loaded', {name:'load', msg:'${scene} is loaded!'})
 });

};

function parse(_obj){

  if(_obj){
      ctx.obj = _obj;
  }else{
     ctx.obj = ctx.arr[ctx.num];
  }
  /** Текущий объект */
    //ctx.obj = ctx.arr[ctx.num];
  /*if(ctx.arr.length===ctx.num){
    ctx.num===ctx.num;
      ev.emit('complete');
  }*/

  for(let key in ctx.obj){
      /*
       * Алиас персонажа содержит не больше трех (3)
       * символов. 
       */
      if(key.length<=3){
             let character = game.characters[key];
            
              let reply = ctx.obj[key]; 
              emit('alias', {
                   character,
                   reply,
                   aliase: key
                 });
             

      }else{
        /*
         * vnjs.on('alert')
         * Подписывает пользовательские плагины
         * 
         */
        ev.emit(key, ctx.obj[key]);
      }
  }
  emit('parse', ctx.obj);
};



function next(){
  
  parse();
  ctx.num+=1;
  emit('next', {name: 'next'});
};
function prev(){
 
  parse();
  ctx.num-=1;
  emit('prev', {name: 'prev'});
};


/*
 * @api
 */
export {
  on,
  ctx,
  init,
  game,
  getScene,
  getScreen,
  config,
  next,
  prev,
  parse,
  emit
};