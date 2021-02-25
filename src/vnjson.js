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
	debug = false;
	//store ui elemenents
	$ = {};
	//current object
	ctx = {};
	//loaded scenes
	TREE = {};
	//scenes.assets store
	assetsPath = [];
	/**
	 * Plugins store
	 */
	plugins = {};
	/**
	 * Необходимо хранить персонажей отдельно
	 * так как потом я сравнить [ ctx ] на предмет
	 * совпадения с персонажами и получить текущего
	 * Что бы получить доступ к пользовательским 
	 * свойствам персонажа character.age
	 */
	characters = [];
	/**
	 * Состояние игры.
	 * Необходимо для загрузки и сохранения
	 * А так же во время дебага, что бы при обновлении
	 * ничего не терялось
	 */
	current = {
		index: 0,
		labelName: 'label',
		sceneName: 'scene',
		characterName: undefined,
		layer: {
			audio: undefined,
			scene: undefined, //bg
			show: {}//left right center show
		},
		conf: {
			typespeed: 30,
			volume: 100,
			zoom: 100
		},
		data: {
			points: 0
		} //userData
	};

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
	/**
	 * Get a character who speaks a line
	 * @return {object} current character
	 */
	getCurrentCharacter (){
		return this.characters.filter(character=>{
				return character.name === this.current.characterName;
		}).pop();
	}
	getCurrentLabelBody (){
		return this.TREE[this.current.sceneName][this.current.labelName];
	}
	/**
	 * Get a character that has already been loaded
	 * @param  {string} name character id
	 * @return {object}
	 */
	getCharacterByName (name){
		return this.characters.filter(character=>{
				return character.name === name;
		}).pop();
	}
	getCtx (){
		return this.getCurrentLabelBody()[this.current.index];
	}
	setScene (name, body){
		this.TREE[name] = body;
		if(body.characters){
					this.characters = this.characters.concat(body.characters)
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

		if(this.getCurrentLabelBody().length-2<this.current.index){
			console.warn("[ label end ]");
			this.current.index = this.current.index;
		}else{
			this.current.index++;
			this.exec();
		}
	};

	use (plugin){
				plugin.call(this);	
	}
	nextTick (fn){
			setTimeout(()=>{
					fn();
			}, 0);
	}
};

return Vnjson;
});

