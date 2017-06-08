/*
 * [bug] Когда хочу получить ctx.screen, то
 * в on('menu') там лежит #preloader
 */
vnjs.on('screen', function(id){

  var { prefix } = this.config;
  
  this.ctx.prevScreens =  this.ctx.prevScreens||[];
  const { prevScreens } = this.ctx;


  if(!prevScreens.length<=0){
      let prevScreen = this.ctx.prevScreens[prevScreens.length-1];
        $(prevScreen).hide();
    
  }


  let _id = ['#', prefix, id].join("");
  
  this.ctx.prevScreens.push(_id);
  $(_id).show();
  this.ctx.screen = _id;
  this.emit(id, $(_id));
});
