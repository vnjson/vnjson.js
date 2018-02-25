
vnjs.on('audio', function(data){
  if(typeof data === 'string'){
       vnjs.audio[data].play(); 

  }else if(typeof data === 'object'){
      vnjs.audio[data.id][data.action]();
     // vnjs.audio[data.id].loop = data.loop;
  }else{
    console.error('incorect data type');
  }


});