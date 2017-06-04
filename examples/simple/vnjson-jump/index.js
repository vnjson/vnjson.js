
vnjs.on('jump', function(pathname){
  let {
        ctx, 
        next, 
        setScene, 
        setLabel, 
        game, 
        parse,
        emit
      } = this;
let isScene = /\/\w+/gi.test(pathname);

function getName(pathname){
  /*
    Сделать проверку num
    что бы можно было сделать так
    jump(scene/label/44)
  */
  let pathArr = pathname.split('/');
 
  let scene = pathArr[0];
  let label = pathArr[1];
 // let num = pathArr[2];
  return { label, scene /*, num */};
};

 let obj = getName(pathname);
 /*
if(obj.num!==undefined){
      this.ctx.num = obj.num;
    }else{
      this.ctx.num = 0;
    }*/

if(isScene){

    emit('getscene', {labelName: obj.label, sceneName: obj.scene, num: obj.num});
}else{

    setLabel(pathname, ctx.scene[pathname],  obj.num );
    parse();
  }
});