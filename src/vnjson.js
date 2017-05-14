
import Events from './minivents'; 

const plugin = new Object();
const option = new Object();

var game = {
    init: {},
    scenes: {},
    characters: {},
    //choices: {},
};

const util = {
  pathNameSplit
}

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



var ev = new Events();//EventEmitter
var { emit } = ev;

/*
 *
 */
function pathNameSplit(pathname){
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
    /*
     * Добавляю персонажей в каждой загруженной сцены
     * в общий пулл.
     */
    game.characters = Object.assign(game.characters, sceneObject.characters);
    /*
     * Переопределяю методы текущего label'a
     */
    setLabel(ctx.label, sceneObject.labels[ctx.label])
    

    emit('setScene', `${sceneName} is defined!`);
    return true;
  }
  catch (err){
    throw new Error('setScene ', err);
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

};



function next(){
  
  
  ctx.num+=1;
  parse();
  emit('next');
};
function prev(){
 
  
  ctx.num-=1;
  parse();
  emit('prev');
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
  option,
  plugin,
  util,
  next,
  prev,
  parse,
  emit
};