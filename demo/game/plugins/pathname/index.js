//pathname
  /*observe.compute(ctx, 'scene', function(value){
        retun getUrl();
  });
*/
vnjs.on('parse', function(){
let { ctx } = this;
let pathname = {
        scene: ctx.scene,
        label: ctx.label,
        num: ctx.num
}
function getUrl(){
  return `/${pathname.scene}/${pathname.label}/${pathname.num}`;
}
  console.log(getUrl());
  //history.pushState(null, null, getUrl());
});
