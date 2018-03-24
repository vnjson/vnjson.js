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

