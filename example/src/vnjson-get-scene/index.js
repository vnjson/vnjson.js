vnjs.getScene = function(sceneName, labelName){
      let { ctx, setScene, get, emit, config} = vnjs;
      emit('preload');
      qwest
        .get(config.scenesDir+sceneName+".json", {responseType: 'json'})
        .then(function(req, res){
                  ctx.label = labelName;
                  setScene(sceneName, res);
         });
};



