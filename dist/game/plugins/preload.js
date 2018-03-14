


vnjs.on('preload', function(data){
 // vnjs.parse({ screen: 'preloader' })

  show(document.getElementById('preloader'))
  
})

vnjs.on('asset', (asset)=>{
  
 document.getElementById('percents').innerHTML = asset.progress
});

vnjs.on('postload', function(){
  setTimeout(_=>{
    hide(document.getElementById('preloader'))
    vnjs.parse();
  }, 2000)


})