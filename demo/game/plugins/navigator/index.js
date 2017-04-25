vnjs.on(function(){
  let { parse, catalog, ctx } = this;
let nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener('mousedown', function(){
        parse(ctx, catalog);
    });
});