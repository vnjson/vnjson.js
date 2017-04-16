import ajax       from './utils/ajax';
import aliase     from './aliase';
/*
 * @api
 */

export {
  on,
  ctx,
  init,
  catalog
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
      },
      {
        event: "left",
        handler: function (data, event){
          console.log(event+": "+data);
        }
      },
      {
        event: "sound",
        handler: function (data, event){
          console.log(event+": "+data);
        }
      }
];

/*
 * game
 */

const game = {
    init: {},
    scenes: {}
};

/*
 * context
 */
const ctx = {
  pathname:'scene/label',
  scene:'scene',
  label:'label',
  arr: [],
  obj: null,
  num: 0,
};
/**
 * plugins
 */
function on(event, handler, flag){
   console.log("plugin: "+event);
  
};

/**
 * init
 */
function init(param){
  game.init = param;

  jump(game.init.entry);
};

function jump(pathname){
  ctx.pathname = pathname;
  const pathArr = pathname.split('/');
  
if(pathArr.length<2){
  //ctx.arr = pathArr[0];
  /* let screen = document.getElementById(game.init.screen);
    screen.addEventListener('mousedown',function(){
        parse();
    });*/
}else{
  ctx.scene = pathArr[0];
  ctx.label  = pathArr[1];
  getScene(ctx.scene);
}
};

function getScene(scene){

const pathToScene = `game/${game.init.scenes}/${game.init.local}/${scene}.json`;

ajax(pathToScene)
  .then((data)=>{
   
    game.scenes[ctx.scene] = data;

    const _SCENE = game.scenes[ctx.scene];
   
    
    ctx.arr = _SCENE.labels[ctx.label];
    /*
     * Логирую для удобства разработки
     *
     */
    console.info(ctx.pathname);
    console.log('---------assets---------------');
    console.log(_SCENE.assets);


    console.log('---------characters-----------');
    console.log(_SCENE.characters);


    console.log('---------labels-----------');
    console.log(_SCENE.labels);
    /** 
     * Склеиваю персонажей из сцены в каталог
     *
     */
    catalog = catalog.concat(_SCENE.characters);
    /**
      * click
      */
    let screen = document.getElementById(game.init.screen);
    screen.addEventListener('mousedown',function(){
        parse();
    });
 });
};

function Обработчик(){

  for(let key in ctx.obj){
    catalog.forEach((item)=>{
      if(item.hasOwnProperty('aliase')){
          if(item.aliase===key){
              let reply = ctx.obj[item.aliase]; 
              aliase(item, reply);
          }
      }
      else if(item.hasOwnProperty('event')){
          if(item.hasOwnProperty('event')){
            if(item.event===key){
              item.handler(ctx.obj[key], key);
            }
          }
      }else{
         console.log('неизвесный элемент: '+ key);
      }   
    });//catalog.forEach
  }//for


}




function parse(){
  
  ctx.obj = ctx.arr[ctx.num];
  
  if(ctx.arr.length<ctx.num){
    ctx.num = 0;
    console.warn("Массив закончен", ctx.num);

  }else{
    Обработчик()
    
   
  }
  ctx.num+=1;
}