
vnjs.on('screen', function(e){
  let {getScreen} = this;
  getScreen(e+".html", function(html){
    document.querySelector('#game').innerHTML = html;
  })
})