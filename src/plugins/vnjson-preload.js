/* @events
    * preload
    * load
    * postload
 */

vnjs.on('load', function(assets){
  /*
  const { emit } = this;
  var persent = 100/assets.length;
  var progress = 0;
for(let i=0; i<=assets.length-1; i++) {
  var position = 1+i+"/"+assets.length;
      progress+=persent

    emit('asset', Object.assign(assets[i], { position, progress: Math.round(progress)+"%"}))   
        if(assets[i].type==="image"){
             var img = new Image();
                 img.src = assets[i].path;
                 img.onload = ()=>emit('img:loaded', assets[i]);
        }else if(assets[i].type==="audio"){
              
            var audio = new Audio();
                audio.addEventListener('canplaythrough', ()=>{
                  emit('audio:loaded', assets[i]);
                }, false);
                audio.src = assets[i].path;

        };



};
*/
console.info('LOADING...')

vnjs.emit('postload');
});
