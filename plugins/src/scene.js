vnjs.on('scene',  function (data, event){
          let scene = document.getElementById('scene');
          scene.style.background = `url(/game/assets/${data}.png)`;
});