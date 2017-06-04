



//getscene event  generate of vnjson-jump
vnjs.on('getscene', function(param){
    let { emit, setLabel, setScene } = this;
    let { labelName, sceneName } = param;

    setLabel(labelName);
    setScene(sceneName, window[sceneName])
    emit('preload');
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



