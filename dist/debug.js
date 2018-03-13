


vnjs.on('init', function(){
  const { DEBUG, emit, on } = this;

/*
on('character', data=>{
  let { param , reply } = data;

   console.log(`%c${param.name}: %c${reply} `, `color: ${param.color}`)
})
*/
on('parse', ctx=>{
  console.log(ctx)
})

})


