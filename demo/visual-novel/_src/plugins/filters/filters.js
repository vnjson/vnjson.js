function vnjsonBlur (ctx){

let sprite = _assets[ctx];

const blurFilter1 = new PIXI.filters.BlurFilter();


sprite.filters = [blurFilter1];

let count = 0;

app.ticker.add(() => {
    count += 0.015;

    const blurAmount = Math.cos(count);
    const blurAmount2 = Math.sin(count);

    sprite.blur = 20 * (blurAmount);
    //blurFilter2.blur = 20 * (blurAmount2);
});
}

/*
filter.contrast(0.5, true);
filter.desaturate();
filter.greyscale(0.4, false);
filter.hue(180, false);
filter.negative(true);
filter.saturate(2, false);
filter.sepia(false);
filter.technicolor(true);
filter.browni(true);
filter.kodachrome(true);
filter.toBGR(true);
*/