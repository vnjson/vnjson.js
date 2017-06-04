
vnjs.on('getscene', function(obj){

     let { ctx, setScene, setLabel, emit, config} = this;
      emit('preload');
      function handler(sceneObject){

                  setLabel(obj.labelName, []);
                  setScene(obj.sceneName, sceneObject);
      };
      let uri = `${config.scenesDir}/${obj.sceneName}.json`;
      unfetch(uri)
        .then(res=>res.json())
        .then(handler)
        .catch(console.error);
});