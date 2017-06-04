
vnjs.on('reply', function(data){
  let { name, color, reply } = data;
  console.log(name+": " + reply);
});

vnjs.on('prof', function(reply){
  this.emit('reply', {name: 'Профессор', color:'red', reply })

});

vnjs.on('alice', function(reply){
  this.emit('reply', { name: 'Алиса', color: 'green', reply })
});


vnjs.on('print', function(data){
 console.log(data);
});


vnjs.on('alert', function(msg){
  alert(msg);
})