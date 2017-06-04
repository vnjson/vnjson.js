/*
 * {
 *    'Пункт меню 1': 'label1',
 *    'Пункт меню 2': { label: 'label2', data: 'true'},
 *    'Пункт меню 3': 'label3',
 *    'Пункт меню 4': 'label4'
 * }
 * ('mousedown',(e)=>{e.target.id})

 */

vnjs.on('menu', function(data){
  let { config, ctx, parse } = this;

  var fragment = document.createDocumentFragment();
  var elemMenu = document.createElement('div');
      elemMenu.className=config.screenPrefix+"menu";
      
    for(let key in data){
      let menuItem = document.createElement('div');
          menuItem.innerHTML = key;      
           /* if(typeof data[key]==='object'){
                menuItem.setAttribute('data-label',data[key].label);
                vnjs.ctx.data = data[key].data;
                /*
                   ctx.choises = [
                      {label,scene,num, data}
                  ]
               
            }else if(typeof data[key]==='string'){
           */
                menuItem.setAttribute('data-label',data[key]);
           // }
          menuItem.className = config.screenPrefix+"menu-item";
      elemMenu.appendChild(menuItem);   
         
    };

    ctx.screen.appendChild(elemMenu);
    var elMenu = document.querySelector('.'+config.screenPrefix+"menu");
        elMenu.addEventListener('mousedown', function(e){
          let label = e.target.getAttribute('data-label');

            parse(`jump: ${label}`);
        })
});