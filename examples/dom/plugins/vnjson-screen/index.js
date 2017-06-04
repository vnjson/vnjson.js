vnjs.on('init', function(){
  unfetch('/screens.html')
      .then(data=>data.text())
      .then(function(data){
        let el = document.querySelector(vnjs.config.elem);
            el.innerHTML = data;
            vnjs.parse('screen: main-menu');
            document
              .querySelector('#vnjson__dialog-box')
              .addEventListener('mousedown', function(e){
                vnjs.next();
              });
            
      });
});

vnjs.prevScreen = [];
vnjs.on('screen', function(id){

/*
 * @src http://javascript.ru/ui/show-hide-toggle
 */


function hide(el) {
  if (!el.getAttribute('displayOld')) {
    el.setAttribute("displayOld", el.style.display)
  }

  el.style.display = "none"
}

var displayCache = {}



function show(el) {
function getRealDisplay(elem) {
  if (elem.currentStyle) {
    return elem.currentStyle.display
  } else if (window.getComputedStyle) {
    var computedStyle = window.getComputedStyle(elem, null )

    return computedStyle.getPropertyValue('display')
  }
}
  if (getRealDisplay(el) != 'none') return

  var old = el.getAttribute("displayOld");
  el.style.display = old || "";

  if ( getRealDisplay(el) === "none" ) {
    var nodeName = el.nodeName, body = document.body, display

    if ( displayCache[nodeName] ) {
      display = displayCache[nodeName]
    } else {
      var testElem = document.createElement(nodeName)
      body.appendChild(testElem)
      display = getRealDisplay(testElem)

      if (display === "none" ) {
        display = "block"
      }

      body.removeChild(testElem)
      displayCache[nodeName] = display
    }

    el.setAttribute('displayOld', display)
    el.style.display = display
  }
}




  let { config, emit, ctx } = this;
      /* Скрываю предыдущий экран */
  
      
      /* Если если это первая сцена, то предыдущей нет*/
      if(this.prevScreen.length!=0){
        console.log(vnjs.prevScreen)
          hide(vnjs.prevScreen.pop())

      }

 var screenEl = document.getElementById(`${config.screenPrefix}${id}`);
    vnjs.prevScreen.push(screenEl);
    show(screenEl)
    this.ctx.screen = screenEl;
    
    emit(id, screenEl);

});


