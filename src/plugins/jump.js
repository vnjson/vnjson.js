vnjs.on('jump', function(pathname){

const { parse, state, emit, DEBUG } = this;

const pathArr = pathname.split('/');
/*****
#WARN
> {jump: 'label/0'}
< Object { labelName: "0", sceneName: "label", index: 0 }

******/
function getName(){
  let sceneName = pathArr[0];
  let labelName = pathArr[1];
  let index = pathArr[2]||0;
  return { labelName, sceneName, index: (+index) };
};

function isNum(num){
  return /[0-9]/.test(+num)
};

function isScene(pathname){

  if(pathArr.length===3){
    return true;
  }else if(pathArr.length===2){
   
    return !isNum(pathArr[1])
  }
};

 var pathObj = getName(pathname);

{
	DEBUG&&console.log('jump: ', pathObj);
};





if(isScene(pathname)){
    // set state
    vnjs.state.scene = pathObj.sceneName;
    vnjs.state.label = pathObj.labelName;
    vnjs.state.index = pathObj.index;
    emit('getScene', pathObj);
}else{
  const pathArr1 = pathname.split('/');
	 // set state
    vnjs.state.scene = vnjs.state.scene;
    vnjs.state.label =  pathArr1[1]
    vnjs.state.index = pathObj.index;

   // setLabel(pathname, ctx.scene[pathname],  obj.num );
   parse();
}


 /*
	state.index = 0;
	state.label = "chapter1";
	state.scene = "scene2";
	parse();*/

});
