vnjs.on('menu', function(menu){
  console.log('[ menu ]', menu);
  //console.log('Так же сделать озвучивание пунктов меню hover')
 /* var menu = document.createElement('div');
  menu.className = "vn-menu";
  menu.id = "vn-menu";
  document.getElementById('scene').appendChild(menu);
function addItem(label, reply){
    let menuItem = document.createElement('li');
    menuItem.id = label;
    menuItem.className = "vn-menu-item";
    menuItem.innerHTML = reply;
    menu.appendChild(menuItem);
  }


  for(let key in menu){
      addItem(menu[key], key);
  }*/
});
//### ДЕЛЕГИРОВАНИЕ СОБЫТИЯ
/*
var FullList = document.getElementById('main_menu'); //переменная с определением всего списка 
  FullList.addEventListener('click',EventHandler,false); 
  // добавляем обработчик события "EventHandler" ко всему списку ссылок 

  function EventHandler(e){ 
   var L = e.target; 
   // получаем объект, на который было выполнено событие 
   if(L.nodeName.toLowerCase() === 'a'){ // определяем, что событие "EventHandler" было вызвано на ссылке 
    alert('Делегирование события '); // небольшое оповещение для проверки 
    e.preventDefault(); // блокируем привычное событие ссылки (переход) 
   } 
  }; 

*/
/*ren.event.menu = function(param){
    

      $('#scene').append('<section id="menu"></section>');
      $.each(param,function(li,label){
        
        
      if(typeof label==='string'){
        $('#menu').append('<li data-label='+label+'>'+li+'</li>')
      }
      else if(typeof label==='object'){
        $('#menu').append('<li data-label='+label.jump+'>'+li+'</li>')
      }

      });
      
      $('#menu').css({
        position:'absolute',
        top:0,
        left:0,
        width:'600px',
        height:'400px',
        background:'rgba(0,0,0,0.7)',
        fontSize:'16pt',
        
      });
      $('#menu li').css({
        background:'red',
        color:'white',
        display:'block'

      });
    
      $('#menu li')
        .mouseover(function(){
          $(this).css('background-color',"rgba(200,0,0,0.7)")
        })
        .mouseout(function(){
          $(this).css('background-color',"red")
        })
        .mousedown(function(){
          
          $('#menu').remove();
          ren.event.jump($(this).attr('data-label'))
        })
  
}*/