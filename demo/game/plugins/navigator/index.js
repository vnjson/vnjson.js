vnjs.on(function(){
  let { prev, next, ctx } = this;
let nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener('mousedown', function(){
        next();
    });

let prevBtn = document.querySelector("#prev-btn");
    prevBtn.addEventListener('mousedown', function(){
        prev();
    });    
});