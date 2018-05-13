


vnjs.on('preload', function(data){
 // vnjs.parse({ screen: 'preloader' })

  $('#preloader').show()
  
})

vnjs.on('asset', (asset)=>{
  
 document.getElementById('percents').innerHTML = asset.progress
});

vnjs.on('postload', function(){
  setTimeout(_=>{
    $('#preloader').hide()
    vnjs.parse();
  }, 2000)


})