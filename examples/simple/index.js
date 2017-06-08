
/* simple plugin */

vnjs.on('print', function(msg){
  let el = document.querySelector(this.config.elem);
      el.innerHTML = msg;
});
vnjs.on('alert',function(e){
  alert(e)
});

/* plugin [jump] emited event [ getscene ] */

vnjs.on('getscene', function(sceneName, labelName, num){

  this.setScene(sceneName, window[sceneName], labelName, num);
});

/*
 * @param { Object } options
 */

vnjs.init({
  elem: '#game'
});

/*  first action */
vnjs.parse('jump: simpleScene/simpleLabel');

document.body.addEventListener('click', function(e){
  vnjs.next();
});