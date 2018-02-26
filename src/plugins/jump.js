vnjs.on('jump', function(pathname){

const { parse, state, emit, DEBUG } = this;


/*****
#WARN
> {jump: 'label/0'}
< Object { labelName: "0", sceneName: "label", index: 0 }


function getName(){
  let sceneName = pathArr[0];
  let labelName = pathArr[1];
  let index = pathArr[2]||0;
  return { labelName, sceneName, index: (+index) };
};

function isNum(num){
  return /[0-9]/.test(+num)
};
******/
function isScene(pathname){

  if(pathArr.length===2){
    return true;
  }else{
   
    return false;
  }
};
/*
 var pathObj = getName(pathname);

{
	DEBUG&&console.log('jump: ', pathObj);
};

*/

const pathArr = pathname.split('/');

if(isScene(pathname)){
    // set state
    vnjs.state.scene = pathArr[0];
    vnjs.state.label = pathArr[1];
    vnjs.state.index = 0;//pathObj.index;
    emit('getScene',{ sceneName:pathArr[0], labelName:pathArr[1], index: 0 });
}else{

	 // set state
   // vnjs.state.scene = vnjs.state.scene;
    vnjs.state.label =  pathArr[0];
    vnjs.state.index = 0;//pathObj.index;

   // setLabel(pathname, ctx.scene[pathname],  obj.num );
   parse();
}



});
