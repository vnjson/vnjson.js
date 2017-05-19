
import Events from './minivents'; 
/*
 * context
 * Значение объекта равно состоянию приложения.
 */
var ctx = {
  sceneName:'scene',
  label:'label',
  scene: {},
  arr: [],
  obj: null,
  num: 0,
};

const plugin = new Object();

//конфигурацию тоже сохранять в memory-card
var config = {
  startLabel: 'start/start',
  local: 'ru-RU',

};

function init(_config){
 config = _config||config;
 let label = splitPathName(config.startLabel).label;
 setLabel(label, []);
 parse({jump: config.startLabel});
 return this;
};
/*
config.get('param')
config.set('param')

*/
var game = {
    init: {},
    scenes: {},
    characters: {},
    //choices: {},
};

const util = {
  splitPathName
}


/*
 * 
 */



var ev = new Events();//EventEmitter
var { emit, off } = ev;

/*
 *
 */
function splitPathName(pathname){
  let pathArr = pathname.split('/');
  let scene = pathArr[0];
  let label = pathArr[1];
  return {label, scene};
}
/**
 * @plugins
 * Регистратор пользовательских событий
 */
/*
 * Объект plugin нужен для тестирования
 * что бы можно было вызывать плагин из
 * текущего окружения, а не плодить глобальные
 * методы.
 */ 

function on(event, handler){
  /*
   * Если функция vnjs.on(function(){})
   * содержит callback без объявления
   * имени события, то функция запускается
   * в резиме autorun;
   */
  if(typeof event==="function"){
      ev.on('autorun', event, vnjs);
  }else if(typeof event==="string"){
      plugin[event] = handler;
      ev.on(event, handler, vnjs);
      
  }

};




/*
 * setScene
 */

/*
 * @Функция принимает объект сцены
 *  {
 *    characters: {},
 *    assets: [{}]
 *    labels: {
 *         start: [{},{},{},{},{},{},{}],
 *    }
 *  }
 */
function setScene(sceneName, sceneObject) {
  try{
    /*
     * Назначаем полученные данные сцены в
     * игровые объекты.
     * А так же объекты внутреннего назначения
     */
    game.scenes[sceneName] = sceneObject;
    ctx.scene = sceneObject;
    /*
     * Добавляю персонажей в каждой загруженной сцены
     * в общий пулл.
     */
    setCharacters(sceneObject.characters);
    /*
     * Переопределяю методы текущего label'a
     */
    setLabel(ctx.label, sceneObject.labels[ctx.label])
    
    parse();
    emit('setScene', `${sceneName} is defined!`);
    return this;
  }
  catch (err){
    throw new Error('Ошибка объявления сцены ', err);
    return false;
  }
};

function setCharacters(sceneCharacters){
  game.characters = Object.assign(game.characters, sceneCharacters);
  return this;
};
function setLabel(labelName, labelArray){
            ctx.label = labelName;
            ctx.arr = labelArray;
            return true;
};

function parse(_obj){

  if(_obj){
      ctx.obj = _obj;
  }else{
     ctx.obj = ctx.arr[ctx.num];
  }
  /** Текущий объект */
    //ctx.obj = ctx.arr[ctx.num];


  for(let key in ctx.obj){
      /*
       * Алиас персонажа содержит не больше трех (2)
       * символов. 
       */
      if(key.length<=2){
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

   return ctx.num;
};



function next(num){
  
  
  ctx.num+=num||1;
  parse();
  emit('next');
  return ctx.num;
};
function prev(num){
 
  
  ctx.num-=num||1;
  parse();
  emit('prev');
  return ctx.num;
};


/*
 * @api
 */
export {
  on,
  ctx,
  game,
  setScene,
  setLabel,
  setCharacters,
  plugin,
  util,
  next,
  prev,
  parse,
  emit,
  off,
  init
};