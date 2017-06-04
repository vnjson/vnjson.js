



//getscene event  generate of vnjson-jump
vnjs.on('getscene', function(param){
    let { emit, setLabel, setScene } = this;
    let { labelName, sceneName } = param;
    emit('preload');
    setLabel(labelName);
    setScene(sceneName, window[sceneName])
    
});
vnjs.on('preload',()=>{console.log('loading...')})
vnjs.on('load', function(assets, sceneName){
  console.log('scene is load')
});
window.onload = function(){

document
  .querySelector('#next')
  .addEventListener('mousedown', function(e){

      vnjs.next();
  });

vnjs
  .init({})
  .on('info', console.info)
  .parse({'print': '>initialization'})
  .parse('jump: scene1/entry')

}



