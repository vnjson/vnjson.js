
class Vnjson {

	constructor (){
			this.index = 0;
			this.ctx = {};
			this.currentLabelName = "";
			this.currentSceneName = "";
			this.plugins = {};
			this.TREE = {};
			this.assetsPath = [];
			this.plugins.jump =  function(pathname){
							let path = pathname.split('.');
							this.index = 0;
							//label
							if(path.length===1){
								this.currentLabelName = path[0];
								this.exec();
							}
							//scene.label
							if(path.length===2){
									this.currentSceneName = path[0];
									this.currentLabelName = path[1];
									let { scenes, order, loader } = this.sceneLoadConfig;
									if(order==='once'){
										var arr = scenes.filter(item=>{ return item.name===path[0];})
										loader(arr[0], _=>{
						
												this.exec();
										});
									}else{
												this.exec();
									};
							};
						};//jump
	}	

	getCurrentLabelBody (){
		return this.TREE[this.currentSceneName][this.currentLabelName];
	}
	getCtx (){
		return this.getCurrentLabelBody()[vnjs.index];
	}
	setScene (name, body){
		this.TREE[name] = body;
		if(body.characters){
					body.characters.forEach((character)=>{
						//Делаем события из индификаторов персонажей
						this.on(character.id, (reply)=>{

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
 
          this.plugins[event] = handler;
	}
	emit (event, ...args){
		if(this.plugins[event]){

			 this.plugins[event].call(this, ...args);
			
		}
		else {
			this.emit('*', event);
		}

	}
	exec (ctx){
		//Получаем текущий объект контекста
		this.ctx = ctx||this.getCtx();
		this.emit('exec', this.ctx);
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
			var i = 0;
				var next = order=>{
					this.sceneLoadConfig = { order, loader, scenes}
					if(order==='once'){
						loader(scenes[i], _=>this.emit('ready'))
					}
					else{
							if(scenes.length!==++i){
								loader(scenes[i], next);
							}else{
								this.emit('ready');
							}
								
					};

				}
				loader(scenes[i], next)

	}
};

