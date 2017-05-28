
vnjs.on('jump', function(pathname){
  let {
        ctx, 
        next, 
        setScene, 
        setLabel, 
        game, 
        parse, 
        getScene, 
        emit
      } = this;
let isScene = /\/\w+/gi.test(pathname);

function getName(pathname){
  let pathArr = pathname.split('/');
  let scene = pathArr[0];
  let label = pathArr[1];
  return { label, scene };
};

  
if(isScene){
    let obj = getName(pathname);
    ctx.num = 0;
    emit('getscene', {labelName: obj.label, sceneName: obj.scene});
}else{
    ctx.num = 0;
    setLabel(pathname, ctx.scene[pathname] );
    parse();
  }
});