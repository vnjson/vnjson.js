/*
 * @ deps getScene
 */
vnjs.on('jump', function(pathname){
  let {
        ctx, 
        next, 
        setScene, 
        setLabel, 
        util, 
        game, 
        parse, 
        getScene, 
        emit
      } = this;

  let isScene = /\/\w+/gi.test(pathname);
  if(isScene){
    let obj = util.splitPathName(pathname);
    console.log(pathname);
    ctx.num = 0;
    getScene(obj.scene, obj.label);
  }else{


   ctx.num = 0;
   setLabel(pathname, ctx.scene.labels[pathname] );

   parse();
  }
});