vnjs.on('right', function (data, event){
  let right = document.getElementById('right');
      right.style.background = `url(/game/assets/${data}.png)`;
});