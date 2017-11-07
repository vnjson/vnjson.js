vnjs.on('preload', ()=>{
  console.log('[ preload ]')
});
vnjs.on('asset', (asset)=>{
  console.log(asset.path)
});
vnjs.on('postload', ()=>{
  console.log('[ postload ]')
});