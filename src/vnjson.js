
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
      prefix: 'vnjson-',
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
     }
};


vnjs.setScene = function (name, body){
  this.TREE[name] = body;
  this.state.scene = name;

  body.characters.map(character=>{
    let aliase = Object.keys(character)[0];

    vnjs.on(aliase, function(reply){
          vnjs.emit('character', {aliase, param: character[aliase], reply } );

    });

});
  this.emit('load', body.assets);
 
};




vnjs.parse = function (obj){
  var ctx = null;
  if(obj){
    ctx = obj;
  }else{
    ctx = vnjs.current.object();
  };

  for(let event in ctx){

        vnjs.emit(event, ctx[event]);

  };

};


vnjs.next = function (){
  this.parse();
  this.state.index++;
  this.emit('next', this.state.index)
  return '-------------------------';
};


vnjs.init = function (conf){
  Object.assign(vnjs.conf, conf);
  this.emit('getScreens')
  this.on('screensLoaded', ()=>{
   
     this.parse( { jump: conf.entryPoint } )
  })
 
  return true;
};


vnjs.progressSave = function(id='default'){
  let { conf } = this;
let serialState = JSON.stringify(this.state); 
    localStorage.setItem(conf.prefix+id, serialState); 
    this.emit('progressSave', { id })
};

vnjs.progressLoad = function(id='default'){
  let { conf } = this;
  let { screen, scene, label, index } = this.state;
  vnjs.state = JSON.parse(localStorage.getItem(conf.prefix+id));

  this.emit('progressLoad', { id });
  this.parse({ screen })
  this.parse({
      jump: [ scene, label, index].join('/')
    })
}

vnjs.progressDelete = function(id){
  let { conf } = this;
  delete localStorage[conf.prefix+id];
  this.emit('progressDelete', { id });
};



var log = {
  error: msg=>{
    console.log(`%c[ Error ] %c ${msg}`, "color: white; background: red; font-size:12px;", "color: red; font-size:12px;");
  },
  scene: (scene, label)=>{
    console.log(`%c ${scene} %c ${label}`, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  event: (e, msg="")=>{
    console.log(`%c[ ${e} ]%c ${msg}`, "color: white; background: orange; font-size:12px;", "color: black; font-size:12px;");
  },
  //#A0BACB
  index: _=>{
    console.log(`%c vnjson.js %c v0.9.3 %c license %c MIT `, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;", "color: white; background: #555555; font-size:12px;", "background: #007EC6; color: white; font-size:12px;");
  },
  license: _=>{
     console.log(`%c license %c MIT `, "color: white; background: #555555; font-size:12px;", "background: #007EC6; color: white; font-size:12px;");
  }

}

log.index();
