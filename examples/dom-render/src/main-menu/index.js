vnjs.on('main-menu', function(){
        this.parse({alert: 'kasin++'})
        document
          .getElementById('start-game')
          .addEventListener('mousedown', function(e){
            e.preventDefault();
            vnjs.parse({'jump': 'chapter1'})
            vnjs.next();

          })
});