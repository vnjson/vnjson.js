vnjs.fn.prevScreen = undefined;
vnjs.on('screen', function(id){
  var { prefix } = this.config;
  let { prevScreen } = this.fn;
  if(prevScreen!=undefined){
    let _id = ['#', prefix, prevScreen].join("");

    $(_id).hide();
  };

  let _id = ['#', prefix, id].join("");
  $(_id).show();
  vnjs.fn.prevScreen = id;
  this.ctx.screen = id;
  this.emit(id, $(_id))
});


vnjs.on('print', function(text){
  console.log(text)
  $(['#',this.config.prefix, this.ctx.screen].join("")).text(text)
});

vnjs.on('getscene', function(sceneName, labelName, num){
  let { scenesDir } = this.config;
  let { setScene } = this;
  $.get(`${scenesDir}/${sceneName}.json`).done(function(data){
    setScene(sceneName, data, labelName, num);
  });
});


vnjs.init({
  prefix: 'game__',
  elem: '#game',
  scenesDir: 'scenes'
});



vnjs.on('splash', function(screen){
  setTimeout(function(){
    //screen.hide();
    vnjs.parse('jump: vol1/chapter1');
  },2000);
})
vnjs.on('main', function(screen){
  this.next();
})

vnjs.parse('screen: splash');