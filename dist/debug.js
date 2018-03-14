


vnjs.on('init', function(){
  const { DEBUG, emit, on, log } = this;


on('character', data=>{
  let { param , reply } = data;

   console.log(`%c${param.name}: %c${reply} `, `color: ${param.color}`)
})

on('parse', ctx=>{
 // console.log('parse',ctx)
})


on('preload', data=>{
  log.event('preload',[ data.sceneName, data.labelName].join('/'))
});
on('asset', asset=>{
  log.info(asset.path)
})
on('postload', ()=>{
   log.event('postload');
})


})


