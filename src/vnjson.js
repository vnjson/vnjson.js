
import Events from './minivents'; 
/*
 * context
 * Значение объекта равно состоянию приложения.
 */
var ctx = {
  sceneName:'scene',
  labelName:'label',
  scene: {},
  label: [],
  arr: [],
  obj: null,
  num: 0,
};


var ev = new Events();//EventEmitter
var { emit, off } = ev;

const plugin = new Object();

//конфигурацию тоже сохранять в memory-card
var config = {};

function init(_config){
 config = _config||config;


 return this;
};

var game = {
    scenes: {},
    //choices: {},
};




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
      plugin[event] = handler;
      ev.on(event, handler, vnjs);
      return this;
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
    ctx.sceneName = sceneName;
    /*
     * Переопределяю методы текущего label'a
     */
    setLabel(ctx.labelName, sceneObject[ctx.labelName])
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
            ctx.labelName = labelName;
            ctx.label = labelArray;
            emit('setlabel', labelName);
            return true;
};

function parse(_obj){

if(_obj){
    if(typeof _obj==='object'){
          ctx.obj = _obj;
    }
    else if(typeof _obj==='string'){
      let data = _obj.split(': ');
        var ob = {
            [data[0]]: data[1] 
          };
        console.log(ob)
        ctx.obj = ob;
    }
    
}else{
    ctx.obj = ctx.label[ctx.num];
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