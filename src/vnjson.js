
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
  obj: null,
  num: 0,
  screen: '',
  data: {} //userData
};


var ev = new Events();//EventEmitter
var { emit, off } = ev;

const plugin = new Object();

//конфигурацию тоже сохранять в memory-card
var config = {};

function init(_config){
 config = _config||config;
 emit('getscreens');
 return this;
};

var game = {
    scenes: {},

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
function setScene(sceneName, sceneObject, labelName, num) {
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
     
    setLabel(labelName, sceneObject[labelName], num);

    emit('load', sceneObject.assets, sceneName);
    
   
    return this;
  }
  catch (err){
    throw new Error('Ошибка объявления сцены ', err);
    return false;
  }
};


function setLabel(labelName, labelArray, num){
            ctx.labelName = labelName;
            ctx.label = labelArray;
            ctx.num = num;
            parse();
            emit('setlabel', labelName);
            return this;
};

function parse(_obj){
/** Текущий объект */
if(_obj){
    if(typeof _obj==='object'){
          /*parse({jump: 'scene/label'})*/
          ctx.obj = _obj;
    }
    else if(typeof _obj==='string'){
      /* parse('jump: string/string') */
      /* Убираю пробелы из строки и разбиваю на массив*/
      let data = _obj.replace(/\s/g, "").split(':');
   
        var ob = {
            [data[0]]: data[1] 
          };
        ctx.obj = ob;
    }
    
}else{
    /* parse() without args */
    ctx.obj = ctx.label[ctx.num];
}  
  

  for(let key in ctx.obj){
  /*
         * vnjs.on('alert')
         * Подписывает пользовательские плагины
         * 
         */
        ev.emit(key, ctx.obj[key]);
  }
  emit('parse', ctx.obj);
  return this;;
};



function next(num){
  

  ctx.num++;
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

var fn = {};


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
  init,
  fn

};