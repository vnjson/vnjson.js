

vnjs.on('splash', function(){
  vnjs.parse('bump: splash')
  setTimeout(function(){
    vnjs.parse('screen: main-menu');
  }, 500);
});
vnjs.on('settings', function(){
  this.parse('background: settings')
})

vnjs.on('main-menu', function(screen){
  let { parse, ctx } = this;
  vnjs.ctx.data.points = 0;
  parse('background: main-menu');

  $('.main_menu li a').on('click', function(e){
    let strData = e.target.getAttribute('data-parse');
    parse(strData);
  });

});
vnjs.on('dialog-box', function(screen){
  let { next, parse, config } = this;


  $(config.textBox).on('mousedown', next);
});
vnjs.on('game-over', function(screen){

  $('#jump-to-main-menu').on('click', function(e){
    e.preventDefault();
    vnjs.parse({'screen': 'main-menu'})
  })
  this.parse({
    background: 'game-over',
  
  });
});

vnjs.on('print', function(data){
  //$(this.ctx.screen).html(data)
  $('.text-box').html(data);
});

vnjs.on('about', function(){
  this.parse({'snake': 'about'})
})
vnjs.on('background', function(id){
  $(this.ctx.screen).css('background-image',`url('assets/${id}.png')`)
});

vnjs.on('snake', function(id){
  console.log('snake')
  let selector = "#vnjson__"+id
    //jsvn.anim.shake = jsvn2.0
  $(selector).animate({"left":"+=8px"}, 50)
                    .animate({"left":"-=8px"}, 50)
                    .animate({"left":"+=8px"}, 50)
                    .animate({"left":"-=8px"}, 50);

});
vnjs.on('bump', function(id){
 let selector = "#vnjson__"+id;
 $(selector).animate({"bottom":"+=8px"}, 50)
                    .animate({"bottom":"-=8px"}, 50)
                    .animate({"bottom":"+=8px"}, 50)
                    .animate({"bottom":"-=8px"}, 50);  
});



vnjs
  .init({
    mainScreen: 'dialog-box',
    menuItemClass: 'menu-item',
    textBox: '.text-box',
    elem: '#game',
    screensPath: './screens.html',
    prefix: 'vnjson__',
    scenesDir: '.'
  })
  .on('setlayers', function(){

    this.parse('screen: splash');
  })
  .on('postload', function(){
    setTimeout(function(){
      console.log('postload')
      vnjs.parse('screen: dialog-box')
    },500);
});