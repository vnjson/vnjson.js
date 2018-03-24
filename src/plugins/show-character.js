

vnjs.on('left', function(data){

  
  let el = document.querySelector('.left');
      el.style.backgroundImage = `url(game/assets/${data}.png)`;
  //el.styl
show(el)
  
});

vnjs.on('center', data=>{
    let el = document.querySelector('.center');
      el.style.backgroundImage = `url(/game/assets/${data}.png)`;
      show(el)
})

vnjs.on('right', data=>{
    let el = document.querySelector('.right');
      el.style.backgroundImage = `url(/game/assets/${data}.png)`;
     show(el)
})