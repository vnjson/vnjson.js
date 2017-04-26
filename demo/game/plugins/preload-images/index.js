vnjs.on('preload', function(){
  console.log('Показать индикатор загрузки');
})

vnjs.on('loaded', function(){
  let arr = this.game.scenes[this.ctx.scene].assets.images;

var images = [];
function preloadImages(arr) {
    for (var i = 0; i < arr.length; i++) {
        images[i] = new Image();
        images[i].src = `/game/assets/${arr[i]}`;
        console.log("loaded: "+arr[i]);
    }
};
preloadImages(arr);
 console.log("Убрать индикатор загрузки");
});