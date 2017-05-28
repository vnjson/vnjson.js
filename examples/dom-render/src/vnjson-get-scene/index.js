
vnjs.on('getscene', function(obj){
    let { ctx, setScene, setLabel, emit, config} = this;
      emit('preload');
      qwest
        .get(config.scenesDir+obj.sceneName+".json", { responseType: 'json' })
        .then(function(req, res){
                  setLabel(obj.labelName, []);
                  setScene(sceneName, res);
         });
})