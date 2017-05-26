

vnjs.on('init', function(){
  let { config, parse, emit } = this;
  qwest.get(config.screensPath, { responseType: 'html' })
      .then(function(body){
         document
            .querySelector(config.el)
            .innerHTML = body.response;

            parse({ jump: config.startLabel });
      }).catch(function(err){
        console.error(err);
      });

});


vnjs.screens = [];
vnjs.on('screen', function(id){
    let { config, parse, emit } = this;
      this.screens.push( id )


      if(this.screens.length>=2){
          let prev = this.screens[this.screens.length-2];

             var prevScreen = document.getElementById(config.screensPrefix+prev);
           prevScreen.style.display = "none";
      }
      var screen = document.getElementById(config.screensPrefix+id);
      screen.style.display = "block";
      emit(id, {id});

});



