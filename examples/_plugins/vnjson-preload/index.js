vnjs.on('preload', function(){
      this.parse('screen: preloader');
});

vnjs.on('load', function(assets){
    /*  assets.forEach(function(item){
        if(item.extension===".png"){
             console.log('[.png] '+item.path)
             var img = new Image();
                 img.src = item.path;
  
        }else if(item.extension===".mp3"){
            console.log('[.mp3] '+item.path)
        }
      });*/
$(vnjs.ctx.screen).html('  <h3>Loading...</h3>');      
assets.forEach(function(asset){
  $(vnjs.ctx.screen).append(`    <li>  ${asset.path} ${asset.size}</li>`)
});

      this.emit('postload');
});
/*
vnjs.on('postload', function(){
  let { ctx, parse } = this;

      
});*/