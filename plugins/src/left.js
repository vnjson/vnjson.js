vnjs.on('left', function (data, event){
  let left = document.getElementById('left');
      left.style.background = `url(/game/assets/${data}.png)`;
});