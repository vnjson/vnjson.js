
var scene1 = {
    entry: [

      { print: 'hello_world', background: 'bg224'},
      { print: 'dialog-box'},
      { prompt: 'Введите имя персонажа' },
      { print: 'kasin' },
      { pl: 'Привет меня зовут так'},
      { print: '> robot <'},
      { jump: 'chapter2'}

    ],
    chapter2: [
      { print: 'CHAPTER@2'},
      { print: 'gradubar'},
      { print: 'seras'},
      { print: 'aaber'},
      { print: '---game-over---'},
     
      { jump: 'lab/labuda'}

    ]
};
var lab = {
      labuda: [
        { print: '[ labuda ]'},
        { print: '0000000000000000000000'},
        { print: 'badaraks'},
        { print: 'raga'},
        { screen: 'game-over'},
      ]
}


var prev = undefined;
vnjs.on('screen', function(id){
  var { prefix } = this.config;
  if(prev!=undefined){
   

    $(prev).hide();
  }
  let _id = ['#vnjson__', id].join("");
  $(_id).show();
  prev = _id;
  this.emit(id, $(_id))
});

vnjs.on('main-menu', function(id){
    let { parse } = this;
    parse('background: main-menu');
    $('#start-game').on('click', function(e){
      parse("screen: dialog-box");
    })
});

vnjs.on('game-over', function(screen){
  this.parse('background: game-over');
})


vnjs.on('background', function(id){
  $(".vnjson__background").html(`<img src="assets/${id}.png"/>`)
});


vnjs.on('reply',(name, reply)=>{

  console.log(name+": "+reply);
})

vnjs.on('prompt', function(q){
 let name = window.prompt(q);
     this.ctx.name = name;
   
});
vnjs.on('pl', reply=>{   
    vnjs.emit('reply', vnjs.ctx.name, reply)  
});

vnjs.on('print', function(text){
  $('#vnjson__text-box').text(text)
});

vnjs.on('dialog-box', function(screen){
    screen.on('mousedown', function(e){
      vnjs.next();
    })
    this.parse('jump: scene1/entry');
});

vnjs
  .init({
    elem:'#game',
    prefix: 'vnjson__'
  })
  .on('getscene', function(sceneName, labelName, num){
    let { setScene, setLabel, emit } = this;
   

    setScene(sceneName, window[sceneName], labelName, num);

   // vnjs.ctx.num = num;

    emit('preload', sceneName);
  })
  .parse('screen: main-menu')
