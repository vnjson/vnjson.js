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

vnjs.on('left', function(id){
  let { util } = this;
  show(util.getId(id));
});

vnjs.on('right', function(id){
  let { util } = this;
  show(util.getId(id));
});

vnjs.on('bg', function(id){
  let { util } = this;
console.log('background')
  show(util.getId(id));
});