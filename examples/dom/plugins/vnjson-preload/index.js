vnjs.on('preload', function(){
      let { parse, on, off } = this;
          
      on('preloader', function(screen){
        //console.log(screen)
        screen.innerHTML = '<h3 style="color:pink">loading...</h3>';
         on('image',img=>screen.innerHTML +=img.path);

      });
      parse('screen: preloader');
});

vnjs.on('load', function(assets){
      let { emit, config } = this;
      assets.forEach(function(item){
        if(item.extension===".png"){
            
             var img = new Image();
                 img.src = item.path;
                 img.style.display = 'none';
                 img.id = vnjs.config.screenPrefix+item.name;
                 img.onload = function(){
                  
                   emit('image', item)
                 }
              document
                .querySelector(config.elem)
                .appendChild(img)    
        }else if(item.extension===".mp3"){
            /*console.log('[.mp3] '+item.path)
             function loadAudio(url, vol){
                var audio = new Audio();
                audio.src = url;
                audio.preload = "auto";
                audio.volume = vol;
               // $(audio).on("loadeddata", launchApp);  // jQuery checking
                 //document.body.appendChild(audio)    
              }
              loadAudio(item.path, 0.9)*/
        }
      });
      emit('postload');
});

vnjs.on('postload', function(){
      let { parse } = this;
      //parse();

      parse('screen: dialog-box');
      
});

