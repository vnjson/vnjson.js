
vnjs.on('jump', function(pathname){
  let {
        ctx, 
        next, 
        setScene, 
        setLabel, 
        config,
        game, 
        parse,
        emit,
        fetch
      } = this;

function getScene(sceneName, labelName, num){
  let { scenesDir } = config;
  fetch(`${scenesDir}/${sceneName}.json`)
   .then(r=>r.json())
   .then(data=>{
    setScene(sceneName, data, labelName, num);
  })
}



function isNum(num){
  return /[0-9]/.test(+num)
};
function isScene(pathname){
  let arr = pathname.split('/');
  if(arr.length===3){
    return true;
  }else if(arr.length===2){
   
    return !isNum(arr[1])
  }
};

function getName(pathname){
  /*
    Сделать проверку num
    что бы можно было сделать так
    jump(scene/label/44)
  */
  let pathArr = pathname.split('/');
 
  let scene = pathArr[0];
  let label = pathArr[1];
  let num = pathArr[2]||0;
  return { label, scene, num };
};

 let obj = getName(pathname);




if(isScene(pathname)){
    emit('preload');
    getScene( obj.scene, obj.label, obj.num);
}else{
    emit('chengelabel')
    setLabel(pathname, ctx.scene[pathname],  obj.num );
    
  }
});