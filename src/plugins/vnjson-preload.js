/* @events
    * preload
    * load
    * postload
 */

vnjs.on('load', function(assets){
  const { DEBUG, emit } = this;


var persent = 100/assets.length;
var PROGREESS = 0;
var i = 0;
for(let asset of assets){
 
var position = [ i+=1, '/', assets.length ].join("");

let progress = Math.round(PROGREESS+=persent)+"%";


  if(asset.type==="image"){
       let img = new Image();
           img.src = asset.path;
           img.onload = function(){
                 emit('imageLoad', asset);
           };
  }
  else if(asset.type==="audio"){
       let audio = new Audio();
           audio.addEventListener('canplaythrough', ()=>{
                  emit('audioLoad', asset);
           }, false);
          audio.src = asset.path;
        vnjs.audio[asset.id] = audio; 
  }
  else{
    console.error('asset type incorect');
    break;
  }
let data = Object.assign(asset, {progress, position});
                  emit('asset', data);
};

{
  DEBUG&&console.info('LOADING...');
};


  emit('postload');
});






