


vnjs.on('preload', function(){
  this.parse({ screen: 'preloader' })
  console.warn('[ preload ]')
})


vnjs.on('postload', function(){
  setTimeout(_=>{
    hide(document.getElementById('preloader'))
  }, 2000)
  
  console.warn('[ postload ]')
})