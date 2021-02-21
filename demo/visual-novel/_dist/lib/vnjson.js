(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.Vnjson = factory(root);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

class Vnjson {
	$ = {};
	//position in current label
	index = 0;
	ctx = {};
	currentLabelName = "";
	currentSceneName = "";
	/**
	 * .getScenes(scenes, loader) 
	 * 	need for [ jump ]
	 */
	sceneLoader = {
		entry: "scene.label",
		mode: "once",//all//lazy
		scenes: undefined,
		loader: undefined 
	};
	TREE = {};
	assetsPath = [];
	plugins = {
		jump: [ pathname=>{

				let path = pathname.split('.');

				this.index = 0;
				//label
				if(!/\./i.test(pathname)){
					this.currentLabelName = path[0];
					this.emit('jump.label', pathname)
				}
				//scene.label
				if(/\./i.test(pathname)){
						this.currentSceneName = path[0];
						this.currentLabelName = path[1];
					
						if(this.sceneLoader.mode==='once'){
							//this.assetsPath = []
							var arr = this.sceneLoader.scenes.filter(item=>{ return item.name===path[0];})
							let next = ()=>{
										this.emit('sceneLoad', {name: arr[0].name, assets: this.assetsPath});
										this.on('postload', ()=>{
											this.emit('jump.scene', pathname)
										})
							}
							this.assetsPath = [];
							this.sceneLoader.loader(arr[0], next);
						}
						else{
								this.emit('jump.scene', pathname)
						};
				};
			}]//jump
	};

	getCurrentLabelBody (){
		return this.TREE[this.currentSceneName][this.currentLabelName];
	}
	getCtx (){
		return this.getCurrentLabelBody()[this.index];
	}
	setScene (name, body){
		this.TREE[name] = body;
		if(body.characters){
					body.characters.forEach((character)=>{
						//{al: 'hello world'}
						//.on('al')
						this.on(character.name, (reply)=>{

							this.emit('character', character, reply);
						})
					});
		};
		if(body.assets){
				body.assets.forEach(item=>{
							this.assetsPath.push(item);
				})
			
		}
	}

	on (event, handler){
 			if(!this.plugins[event]) {
      	this.plugins[event] = []; //Many listeners for one emit
    	}
      this.plugins[event].push(handler);
	}
	emit (event, ...args){
			if (Array.isArray(this.plugins[event])) {
      	this.plugins[event].forEach(handler =>{
      		handler.call(this, ...args);
      	})
    	}
    	else {
				this.emit('*', event);
			}
	}
	off (event){
		 delete this.plugins[event]
	}
	exec (ctx){
		//Получаем текущий объект контекста
		this.ctx = ctx||this.getCtx();
		if(typeof this.ctx === 'string'){
					this.emit('print', this.ctx);
		}else{
			/**
			 * Преобразуем объект контекста [this.ctx] в массив 
			 * [ ['key', 'value'], ['key2','value2']]
			 * Пробегаемся по этому массиву, и записываем 
			 * ключ-значение в переменные [ event, data ]
			 */
			for(let [event, data] of Object.entries(this.ctx)){
			/**
			 * Вызываем плагины с соответсвующими именами ключей
			 */
				this.emit(event, data);
			}
		}/*else*/
		this.emit('exec', this.ctx);
	}


	next (){

		if(this.getCurrentLabelBody().length-2<this.index){
			console.warn("[ label end ]");
			this.index = this.index;
		}else{
			this.index++;
			this.exec();
		}
	};

	getScenes (scenes, loader){
			this.sceneLoader.loader = loader; 
			this.sceneLoader.scenes = scenes;
			var i = 0;

			var next = ()=>{
				
					if(scenes.length!==++i){
							loader(scenes[i], next);
					}else{
							this.emit('sceneLoad', {name: 'assets', assets: this.assetsPath});
					}
					
				};
				if(this.sceneLoader.mode!=='once'){
						loader(scenes[i], next)
				}
			

	};

};

return Vnjson;
});

