var vnjs = new Object();
var DEBUG = false;
/*
 * TREE[SCENE_NAME] = SCENE_OBJECT;
 */
var TREE = {};
/*
 * В {state} должно помещаться все то
 * что сохроняется в карту памяти
 * И что важно загрузить из нее без последствий.
 * В состоянии не должно быть мусора
 */
var state = {
  scene: 'scene',
  label: 'label',
  index: 0
}
/*
 * Получает текущее тела из состояние
 */
function setScene(name, body){
  TREE[name] = body;
  state.scene = name;
}


var current = {
  
      scene: ()=>{
        return TREE[state.scene];
      },
      label: ()=>{
        return TREE[state.scene][state.label];
      },
      object: ()=>{
        return TREE[state.scene][state.label][state.index];
     }
}

function parse(){
  for(let event in current.object()){

        console.info(`${event} : ${current.object()[event]}`)
      //  ev.emit(key, ctx.obj[key]);
  }
}


function next(){
  parse();
  state.index++;
}


function init(conf){

}






function setLabelName(name){

}
