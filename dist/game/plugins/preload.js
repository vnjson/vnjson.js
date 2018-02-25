


vnjs.on('preload', function(){
  this.parse({ screen: 'preloader' })
  console.warn('[ preload ]')
})

vnjs.on('asset', (asset)=>{
  console.info(asset)
});

vnjs.on('postload', function(){
  setTimeout(_=>{
    hide(document.getElementById('preloader'))
  }, 2000)
  this.parse();
  console.warn('[ postload ]')
})