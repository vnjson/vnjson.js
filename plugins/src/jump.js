/*vnjs.jump = function(pathname){
  var ctx = this.ctx;
  var game = vnjs.game;

let isScene = /\/\w+/gi.test(pathname);

if(isScene){
   console.info(`[ ${pathname} ]`);
  const pathArr = pathname.split('/');
  ctx.num = 0;
  ctx.scene = pathArr[0];
  ctx.label  = pathArr[1];
 
  this.getScene(ctx.scene);

 
}

else{
 
   ctx.num = 0;
   ctx.label = pathname;
   ctx.arr = game.scenes[ctx.scene].labels[ctx.label];
   console.warn('[ is label ]: '+pathname);
   this.parse(ctx, this.catalog);
};
};*/