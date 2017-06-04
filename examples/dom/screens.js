

vnjs.on('main-menu', function(){
  let { getId } = this.util;
  let { parse, ctx } = this;


  document.getElementById('start-game')
    .addEventListener('mousedown', function(e){
      e.preventDefault();
        
      parse('jump: home/entry-point');
      
    });

  document.getElementById('settings')
    .addEventListener('mousedown', function(e){
      e.preventDefault();

      parse('screen: settings');

    });
  document.getElementById('about')
    .addEventListener('mousedown', function(e){
      e.preventDefault();

      parse('screen: about');

    });
  document.getElementById('memory-card')
    .addEventListener('mousedown', function(e){
      e.preventDefault();

      parse('screen: memory-card');

    });

});


vnjs.on('memory-card', function(){
            vnjs.save = function(){
               console.dir(ctx);
              }
          console.log('[memory-card]')    
        })
vnjs.on('about', function(){
    console.log('[about]')
});

vnjs.on('settings', function(){
    console.log('[settings]')
})