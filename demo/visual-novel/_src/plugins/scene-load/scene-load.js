function assetsLoader(scene){

const loader = new PIXI.Loader();

loader.onStart.add(() => {
	vnjs.emit('preload', scene);
});
loader.add(scene.assets).load();

loader.onLoad.add((loader, res) => {

			if(res.extension==='mp3'){

				_assets[res.name] = res.sound;
			}else{
				_assets[res.name] = new PIXI.Sprite(res.texture);
			}
			vnjs.emit('load', `${Math.round(loader.progress)}%`, res.url);

		}); 

loader.onComplete.add(() => {
	vnjs.emit('postload', scene);
});


};