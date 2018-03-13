vnjs.on('jump', function(pathname){



const { parse,  emit, DEBUG, conf, setScene } = this;

function getScene(sceneName, labelName){


  let uri = `${conf.gameDir}/${conf.scenesDir}/${conf.local}/${sceneName}.json`;
  emit('preload', { sceneName, labelName });
  fetch(uri)
  .then(r=>r.json())
  .then(sceneBody=>{


    vnjs.setScene(sceneName, sceneBody);

  });
/*

setScene("*", sceneBody);

state.label = "mainMenu";

next();
*/

}


function isScene(pathName){
  var arr = pathName.split('/');
  /*
      scene/label/index
  */
  if(arr.length===3){
    if( isNaN(+arr[2]) ){
      console.warn('scene/label/index')
      console.warn('Index should be a Number');
      vnjs.state.index = 0;
    }
    
    return true;
  }
  /*
      scene/label
  */
  else if(arr.length===2){
    var isLabel = false;
     /*  scene/label  */
    if( isNaN(+arr[1]) ){
      isLabel = true;
    }
    /*  label/index  */
    else {
      isLabel = false;
    }
   
    return isLabel;
  }
 
};

  var arr = pathname.split('/');

if(isScene(pathname)){


    // set state
    vnjs.state.scene = arr[0];
    vnjs.state.label = arr[1];
    vnjs.state.index = arr[2]||0;
   getScene(vnjs.state.scene, vnjs.state.label);



}else{
 
	 // set state
   // vnjs.state.scene = vnjs.state.scene;
    vnjs.state.label = arr[0];
    vnjs.state.index = arr[1]||0;

   parse();
}



});


