vnjs.on(function(){
  let { prev, next, ctx, parse } = this;
let nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener('mousedown', function(){
        next();
    });

let prevBtn = document.querySelector("#prev-btn");
    prevBtn.addEventListener('mousedown', function(){
        prev();
    });
document
  .querySelector('#main-menu-btn')     
  .addEventListener('mousedown', function() {
      parse({
        "screen": "main-menu",
        "scene": "background"
      });
  });  
});