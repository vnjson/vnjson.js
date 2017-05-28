/*
 * @plugins
 */
vnjs.on('print', function(data){
  document.querySelector('#output').innerHTML = data;
});


vnjs.on('alert', function(msg){
  alert(msg);
})