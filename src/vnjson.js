
var vnjs = {
  
      plugins: {},
      TREE: {},
      DEBUG: false,
      playList: {},
      prevAudio: "",
      prevScreen: "",
      screenList: {}
};

vnjs.conf = {
      prefix: '',
      element: '.gameElement',
      gameDir: './game',
      scenesDir: "scenes",
      local: 'en-US',
      entryPoint: 'entry/point',
      screenClass: '.screen'
};

vnjs.on = function(event, handler){
          if (!vnjs.plugins[event]) {
              vnjs.plugins[event] = [];
          };
          vnjs.plugins[event].push(handler);
};

vnjs.emit = function (event, ...args) {
         if (Array.isArray(vnjs.plugins[event])) {
            vnjs.plugins[event].map(function(handler){
                    handler.call(vnjs, ...args);
            });
         }
         /*
         else{
          Выводятся системные слушатели
          console.log(`Event [ ${event} ] not found`)
         }
         */
};
vnjs.off = function (event) {
        delete vnjs.plugins[event];
};

/*
 * В {state} должно помещаться все то
 * что сохроняется в карту памяти
 * И что важно загрузить из нее без последствий.
 * В состоянии не должно быть мусора
 */

vnjs.state = {
  scene: 'scene',
  label: 'label',
  index: 0,
  screen: "", //current screen
  data: {}, //userData
};


/*
 * Получает текущее тела из состояние
 */
vnjs.current = {
  
      scene: function (){
        return vnjs.TREE[vnjs.state.scene];
      },
      label: function (){
        return vnjs.TREE[vnjs.state.scene][vnjs.state.label];
      },
      object: function (){
        return vnjs.TREE[vnjs.state.scene][vnjs.state.label][vnjs.state.index];
      },
      screen: function(){
        //> DOM<
        return document.getElementById(`${vnjs.conf.prefix}${vnjs.state.screen}`)
      },
      //character
};


vnjs.setScene = function (name, body){
  this.TREE[name] = body;
  this.state.scene = name;
  if("characters" in body){


  body.characters.map(character=>{
    let aliase = Object.keys(character)[0];

    vnjs.on(aliase, function(reply){
      let obj = {aliase, param: character[aliase], reply };
          vnjs.emit('character', obj );
          vnjs.current.character = function(){
            return obj;
          }
    });

  });//.map

 };

if("assets" in body){
   this.emit('load', body.assets);
}else{
  emit('postload');
}
 
 
};




vnjs.parse = function (obj){
  var ctx = null;
  if(obj){
    ctx = obj;
  }else{
    ctx = vnjs.current.object();
  };
  
  for(let [ event, data] of Object.entries(ctx)){
      vnjs.emit(event, data)
  };
  this.emit('parse', ctx)
};


vnjs.next = function (){
 
  this.state.index++;
  this.parse();

};

vnjs.getScreens = function(param=null, callback){
const { conf, DEBUG, emit } = this;

function fetchCss(filename) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = filename
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(l);
};



  
  let uriHtml = `${conf.gameDir}/screens.html`;
  let uriCss = `${conf.gameDir}/screens.css`;
  let gameRoot = document.querySelector(conf.element);
  fetch(uriHtml)
    .then(r=>r.text())
    
    .then(screens=>{
      fetchCss(uriCss);
      gameRoot.innerHTML = screens;
    })
    .then(()=>{
      let screensNodeList = document.querySelectorAll(conf.screenClass);
            screensNodeList.forEach((screen)=>{

             let styles = {
                    display: 'none',
                    width: '100%',
                    height: '100%'
                  };
             Object.assign(screen.style, styles);

    

            vnjs.screenList[screen.id] = screen;

            
            });

          callback()
    })
   .catch(error=>console.error(error))

};


vnjs.init = function (conf){
  Object.assign(vnjs.conf, conf);
  this.getScreens(null, ()=>{
     this.parse( { jump: conf.entryPoint } )
     this.emit('init')
  })

 
  return true;
};




vnjs.log = {
  error: msg=>{
    console.log(`%c Error %c ${msg}`, "color: white; background: red; font-size:12px;", "color: red; font-size:12px;");
  },
  /*
  scene: (scene, label)=>{
    console.log(`%c ${scene} %c ${label}`, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },*/
  event: (e, msg="")=>{
    console.log(`%c ${e} %c ${msg} `, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  //#A0BACB
  index: _=>{
    console.log(`%c vnjson.js %c v0.9.3`, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  info: data=>{
    console.log(`%c ${data}`, "color: #A0BACB; background: #ffffff; font-size:12px;")
  }
}



vnjs.log.index();
