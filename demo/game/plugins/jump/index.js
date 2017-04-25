vnjs.on('jump-test', function(pathname){
let { getScene, ctx, game, parse, catalog} = this;

 /*
  * Если есть слэш в пути прыжка
  * то это сцена, значит надо подружать
  * ресурсы и т.д.
  */
let isScene = /\/\w+/gi.test(pathname);

if(isScene){

  const pathArr = pathname.split('/');
  ctx.num = 0;
  ctx.scene = pathArr[0];
  ctx.label  = pathArr[1];
 
  getScene(ctx.scene);

 
}
  /*
   * Если слэша нет, то это значит лабел.
   * поэтому не надо делать лишних телодвижений
   * а просто выполнить уже загруженный массив
   */
else{
 
   ctx.num = 0;
   ctx.label = pathname;
   ctx.arr = game.scenes[ctx.scene].labels[ctx.label];
   parse(ctx, catalog);
};


});