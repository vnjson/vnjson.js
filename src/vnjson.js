
import Events         from './minivents'; 
import fetch          from './unfetch';

/*
 * development mode
 */
var DEBUG = false;
/*
 * TREE[SCENE_NAME] = SCENE_OBJECT;
 * state
 */
/*
 * 
 * Значение объекта равно состоянию приложения.
 */
/** state **/
var ctx = {
  sceneName:'scene',
  labelName:'label',
  scene: {},
  label: [],
  obj: null,
  num: 0,
  screen: '',
  jumps: [],
  data: {
    points: 0
  },
};


var ev = new Events();//EventEmitter
var { emit, off } = ev;



//конфигурацию тоже сохранять в memory-card
var config = {};

function init(_config){
 config = _config||config;
 emit('init');
 return this;
};


/**/
var game = {
    scenes: {},
    package: {
      
    },
    assets: [],
    settings: {}
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
    sceneObject.assets.forEach((item)=>{
        game.assets.push(item);
    });

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
            emit('setlabel', labelName, labelArray.length);
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
           /* if(config.debug)
            * ejv.validate(schema, ctx.obj.[key])
            */
        ev.emit(key, ctx.obj[key]);
  }
  emit('parse', ctx.obj);
  return this;;
};



function next(){
  let { label, num } = ctx;
  
if(num>=label.length){
  console.log('[end label]');
  ctx.num = 0;
}
  ctx.num++;
  parse();
  emit('next');
  return ctx.num;
};

on('setlabel', function(labelname, len){
 let { sceneName, labelName } = vnjs.ctx;
    
     ctx.jumps.push({sceneName, labelName, len});
});
/*
 * Должна показывать предыдущие экраны
 * А так же все движения между метками и сценами
 * 
 */
function prev(){

 let { jumps, label } = ctx;
  if(label.indexOf(-1)){
    if(jumps.indexOf(0)){
       // parse(`screen: ${fn.prevScreen}`)//preloader??
       console.log('Начало игры');
       ctx.num = 0;
       /*fn.prevScreen it should to be array*/
    }else{
      let { sceneName, labelName, len } = jumps.pop();
      let jumpTo = [ sceneName, labelName, len ].join("/");
      parse('jump: '+jumpTo)
    }
  }else{
      ctx.num--;
      parse();
  }

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
  next,
  prev,
  parse,
  emit,
  off,
  init,

  fetch,
  DEBUG
};