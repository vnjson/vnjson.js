
vnjs.on('main-menu', (e)=>{

 $('nav a').on('click', function(e){
    let strData = e.target.getAttribute('data-parse');
    vnjs.parse(strData);
 })
})