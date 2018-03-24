

vnjs.on('audio', function(data){



  if(typeof data === 'string'){
      
       if(vnjs.prevAudio!=""){
         vnjs.playList[vnjs.prevAudio].pause();
       }
       vnjs.playList[data].play(); 
       vnjs.prevAudio = data;

  }else if(typeof data === 'object'){

      if(vnjs.prevAudio!=""){
          vnjs.playList[vnjs.prevAudio].pause();
       }

      vnjs.playList[data.id][data.action]();
    
       vnjs.prevAudio = data.id;
     // vnjs.audio[data.id].loop = data.loop;
  }else{
    console.error('incorect data type');
  }
//var sound = self.playlist[self.index].howl;

});


