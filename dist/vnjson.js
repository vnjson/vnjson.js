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
	version = '1.6.2';
	//current object
	ctx = {};
	//loaded scenes
	TREE = {};
	constructor (){
		this.initJumpPlugin();
		this.treeVnjson();
	}

	/**
	 * Plugins store
	 */
	plugins = {};
	/**
	 * Состояние игры.
	 * Необходимо для загрузки и сохранения
	 * А так же во время дебага, что бы при обновлении
	 * ничего не терялось
	 */
	current = {
		index: 0,
		labelName: 'entry',
		sceneName: '$root',
		character: {id: '$', name: 'Norrator'},
		render: {
			screen: undefined,
			audio: undefined,
			scene: undefined, //bg
			show: {}//left right center show
		},
		options: {
			typespeed: 30,
			volume: 100,
			zoom: 100
		},
		data: { 
			points: 0
		},
		tree: [],
		allAssets: [],
		assets: []
	};
	/**
	 * Preloaded images and audio object
	 */
	$store = {};


	getAssetByName (name){
		return this.current.assets.filter(asset=>{
											return asset.name===name;
					 })[0];
	}
	getCurrentLabelBody (){
		let labelBody = this.TREE[this.current.sceneName][this.current.labelName];
		if(labelBody){
			return labelBody;
		}
		else{
			this.emit('pathNotFound')
			return [''];
		}
	}
	getCurrentCharacter (){

		return this.current.character;
	}
	getCharacterById (id){
		return this.TREE.$root.characters.filter(character=>{
				return character.id === id;
		}).pop();
	}
	getCtx (){
		let ctx = this.getCurrentLabelBody()[this.current.index];
		return ctx;

	}
	setTree (tree){
		this.TREE = tree;
		if(this.TREE.$root.characters){
					
					this.TREE.$root.characters.forEach((character)=>{
						/**
						 * Навешиваем слушатель на id персонажа
						 * 
						 */
						this.on(character.id, (reply)=>{

							this.current.character = character;
							this.emit('character', character, reply);
						})

					});
		};
		this.emit('setTree')
	}

	on (event, handler){
 			if(!this.plugins[event]) {
      	this.plugins[event] = []; //Many listeners for one emit
    	}
      this.plugins[event].push(handler);
	}
	emit (event, ...args){

		setTimeout(_=>{
			if (Array.isArray(this.plugins[event])) {
      	this.plugins[event].forEach(handler =>{
      		handler.call(this, ...args);
      	})
    	}
    	else {
				this.emit('*', event);
			}
		}, 0)
	}
	off (event){
		 delete this.plugins[event]
	}
	exec (ctx){
		//Получаем текущий объект контекста
		this.ctx = ctx||this.getCtx();
		if(typeof this.ctx === 'string'){
					this.emit('character', this.getCharacterById('$'), this.ctx);
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
		this.emit('exec', this.ctx)
	}

	next (){
		if(this.getCurrentLabelBody().length-2<this.current.index){
			
			this.current.index = this.current.index;
			this.emit('labelEnd');
		}else{
			this.current.index++;
			this.exec();
		}
	};

	use (plugin){
				plugin.call(this);	
	}
	initJumpPlugin (){
		function jumpHandler(pathname){

				let path = pathname.split('.');
				this.current.index = 0;
				//label
				if(!/\./i.test(pathname)){		
					this.current.labelName = path[0];
					this.emit('init', false);

				}
				//scene.label
				if(/\./i.test(pathname)){
						this.current.sceneName = path[0];
						this.current.labelName = path[1];
						this.emit('init', true);
				};
			};
			this.on('jump', jumpHandler);
	}
	/**
	 * Для дебага дерево прыжков строим
 	 */
		treeVnjson (){
			/**
 			* Строим дерево наших похождений
 			* Это нужно для дебага и может потом
 			* реализуют .pref но это не точно.
 			*/
			var sceneNode;
			function progressTreeBuilding  (isScene){
					var scene = this.current.sceneName;
					var label = this.current.labelName
					if(isScene){
								sceneNode = {
												name: scene,
												children: new Array()
										};
							//Добавляю узел в глобальное рисунок дерева
							this.current.tree.push(sceneNode);
					}
					//Определяю индекс свежесозданного узла внутри дерева
					let indexInTree = this.current.tree.indexOf(sceneNode);
					//Получаю доступ к текущему узлу
					var sceneObject = this.current.tree[indexInTree];
					//добавляю в текущую сцену все label по которым
					//перешел пользователь 
					sceneObject.children.push(label);	
			};
			this.on('init', progressTreeBuilding)
		};
	};

return Vnjson;
});

