
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
var config = {};

function init(_config){
 config = _config;

 emit('init', config);

 return this;
};

var game = {
    scenes: {},
    //choices: {},
};


var ev = new Events();//EventEmitter
var { emit, off } = ev;


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
 * @Функция принимает объект сцены
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
     * Переопределяю методы текущего label'a
     */
    setLabel(ctx.label, sceneObject[ctx.label])
    emit('setscene');
    parse();
    
    return this;
  }
  catch (err){
    throw new Error('Ошибка объявления сцены ', err);
    return false;
  }
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
         * vnjs.on('alert')
         * Подписывает пользовательские плагины
         * 
         */
        ev.emit(key, ctx.obj[key]);
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
  config,
  plugin,
  next,
  prev,
  parse,
  emit,
  off,
  init
};