
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

var ev = new Events();//EventEmitter
var { on, emit, off } = ev;

function parse(obj){
  var ctx = null;
  if(obj){
    ctx = obj;
  }else{
    ctx = current.object()
  }

  for(let event in ctx){

        emit(event, ctx[event])

  }
}


function next(){
  parse();
  state.index++;
  return '-------------------------';
}


function init(conf){

}

vnjs = {
  next,
  parse,
  init,
  on,
  emit,
  off,
  state,
  setScene,
  TREE,
  DEBUG,
  current
}
/*
if (typeof pattern !== 'string') {
    throw new TypeError('glob-base expects a string.');
  }


if (typeof obj !== 'object') {
    throw new TypeError('Expected an object');
  }

    
*/
