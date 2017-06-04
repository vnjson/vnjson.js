vnjs.on('reply', function(data){

  document.querySelector('.namebox').innerHTML = data.name;
  document.querySelector('.textbox').innerHTML = data.reply;

});

vnjs.on('pr', function(reply){
  this.emit('reply', { name: 'Профессор', reply });
});

vnjs.on('ll', function(reply){
  this.emit('reply', { name: 'Люсиль', reply });
});

vnjs.on('print', function(reply){
  this.emit('reply', { name: '', reply})
})