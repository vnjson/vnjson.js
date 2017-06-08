/*
 * @emit preload
 *
 */

vnjs.on('getscene', function(sceneName, labelName, num){
  let { scenesDir } = this.config;
  let { setScene, emit } = this;
  emit('preload', sceneName, labelName, num);
  $.ajax({
    url: `${scenesDir}/${sceneName}.json`,
    dataType: 'json',
    success: function(data){

      setScene(sceneName, data, labelName, num);

    },
    error: function(err){
      console.error("Ошибка загрузки сцены",err);
    }
  })  
});