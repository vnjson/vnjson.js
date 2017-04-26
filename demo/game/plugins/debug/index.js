vnjs.on('next', function(e){
//vnjs.on('prev')
//vnjs.on('next').then(function(e){})
console.log(e.name+": "+this.ctx.num);
/*observe(this.ctx, 'num', function (newValue, oldValue) {
  console.log("num: "+newValue)
});*/
});
vnjs.on('prev', function(e){
//vnjs.on('prev')
//vnjs.on('next').then(function(e){})
console.log(e.name+": "+this.ctx.num);
/*observe(this.ctx, 'num', function (newValue, oldValue) {
  console.log("num: "+newValue)
});*/
});

