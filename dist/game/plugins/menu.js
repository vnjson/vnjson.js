
vnjs.on('menu', function(menu){

var className = 'game-menu-item';

var gameMenu = document.querySelector('.game-menu')


    gameMenu.style.display = 'block';
   //dBox.removeEventListener('click', handler);
    gameMenu.addEventListener('click', e=>{
      gameMenu.style.display = "none";
      //dBox.addEventListener('click', handler)
      this.parse({
        jump: e.target.getAttribute('data-jump')
      })

    })
   // console.log(data)

    for(let key in menu){
      if(typeof menu[key]==='object'){
         gameMenu.innerHTML += `<div data-jump="${menu[key].jump}" data-point="${menu[key].point}" class='${className}'>${key}</div>`;
      }else{
          gameMenu.innerHTML += `<div data-jump="${menu[key]}"  class='${className}'>${key}</div>`;

      }
     
    }
})