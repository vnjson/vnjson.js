
vnjs.on('screen', function(e){
  let { getScreen, emit, config } = this;
  
  getScreen(e+".html", function(html){
    document.querySelector(config.screen).innerHTML = html;
    emit(e);
  });
});

