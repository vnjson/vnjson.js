vnjs.on('preload', function(){
  this.parse({
        "screen": "preloader"
      });

})
vnjs.on('setscene', function(){
    let { emit, game, ctx } = this;

  ctx.scene.assets.forEach((item)=>{
    console.info(item)
  });
  emit('load');
});

vnjs.on('load', function(){
  setTimeout(function(){
    document.getElementById('vnjson__preloader').style.display = "none";
  }, 3000);
});