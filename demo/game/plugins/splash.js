vnjs.on('splash', ()=>{
  console.log('[ SPLASH ]')
  setTimeout(()=>{
    vnjs.parse({screen: "main-menu"})
  },2000)
})