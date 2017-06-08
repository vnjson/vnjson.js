/*
 * [bug] не коррестно получает ctx.screen
 * @config { String } mainScreen __hack__
 * @config { String } textBox // Use it for .off('mousedown')
 * @config { String } menuItemClass
 * @emit('data', vnjs.ctx.data, {points: +points})
 */

vnjs.on('menu', function(data){
  let { config, ctx, parse, next, emit } = this;

  const wrapperClassName = config.prefix+"memu";
  const subMenu = `#${config.prefix}${config.mainScreen}`;

$(config.textBox).off('mousedown');
/*
 * Удаляю слой меню
 * Вешаю событие click
 */
function resume(){
    $("."+wrapperClassName).remove();
    $(config.textBox).on('mousedown', next);
};

var fragment = document.createDocumentFragment();
var elemMenu = document.createElement('div');
    elemMenu.className = wrapperClassName;

var val, menuItem;
/*
 * Пробегаюсь по меню {menuItem1, menuItem2}
 * И создаю пункты меню в DOM
 */
for(let key in data){
    val = data[key];
    if(typeof val==='object'){
        menuItem = `<li><a href="#" data-points="${val.points}" data-jump="${val.jump}" class="${config.menuItemClass}">${key}</a></li>`;
      $(elemMenu).append(menuItem);

    }else if(typeof val==='string'){
       
        menuItem = `<li><a href="#" data-jump="${val}" class="${config.menuItemClass}">${key}</a></li>`;
        $(elemMenu).append(menuItem);
    }
}

fragment.appendChild(elemMenu);

document
  .querySelector(subMenu)
  .appendChild(fragment); 
/*
 * Делегирование событий. Пункты меню
 * @attr data-jump
 * @attr data-points
 */
$('.'+wrapperClassName).on('mousedown', function(e){
        e.preventDefault();
        let label = $(e.target).attr('data-jump');
        let points = $(e.target).attr('data-points');
        let key = $(e.target).text();
        /*
         * Проверка существование points
         */
        if(points!==undefined){

           vnjs.ctx.data.points+=+points;
           emit('data', vnjs.ctx.data, {key: key, points: +points})
        }
        /*
         * Проверка на существование label
         *
         */
        if(label.length<=1){
            next();
            resume();
        }else if(typeof label ===undefined){
            resume();
        }else{
            resume();
            vnjs.parse({'jump': label});

        }

});

 
});


vnjs.on('data',function(data, newData){
  console.log("points: "+data.points);
  //console.log(newData)
});