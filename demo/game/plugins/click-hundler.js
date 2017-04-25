vnjs.on(function(){
  let {ctx, game, catalog, parse } = this;
    let screen = document.getElementById(game.init.screen);
        parse(ctx, catalog);
    screen.addEventListener('mousedown', function(){
        parse(ctx, catalog);
    });
});