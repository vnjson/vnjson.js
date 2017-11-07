

window.addEventListener('DOMContentLoaded', function(){

var config = {

      gameElem: "#game",
      gameDir: "/game",
      local: 'ru-RU',
      prefix: 'vnjson-',

      scenesDir: '/scenes',
      screensPath: '/screens.html',
      styles: '/styles.css',


};
vnjs.DEBUG =  true,

vnjs.on('print', console.log)





/**/
vnjs.on('screensloaded', function(){
  vnjs.parse({
    screen: "splash"
  });
})

vnjs.init(config);

});