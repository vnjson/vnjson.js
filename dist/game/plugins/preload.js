


vnjs.on('preload', function(data){
  this.parse({ screen: 'preloader' })
  log.scene(data.sceneName, data.labelName)
  log.event('preload')
})

vnjs.on('asset', (asset)=>{
  console.log(asset)

});

vnjs.on('postload', function(){
  setTimeout(_=>{
    hide(document.getElementById('preloader'))
  }, 2000)
  this.parse();
 // console.warn('[ postload ]')
 log.event('postload')
})