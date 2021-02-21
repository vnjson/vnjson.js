function vnjsonRotate(name){
	let sprite = _assets[name];

app.ticker.add((delta) => {
    sprite.rotation += 0.01 * delta;
});

}

function vnjsonScale(name){
	//let sprite = _assets[name];
	//sprite.scale.set(2,2);
}