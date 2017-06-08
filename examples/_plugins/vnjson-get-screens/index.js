vnjs.on('getscreens', function(){
  var { emit } = this;
  var { screensPath, elem } = this.config;  
  $.ajax({
    url: screensPath,
    dataType: 'html',
    success: function(data){
      $(elem).html(data);
      emit('setlayers')
    },
    error: function(err){
      console.error("Ошибка загрузки слоев",err);
    }
  })
  
});