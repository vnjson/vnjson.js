class Vnjson {
	scene = {};
	index = 0;
	ctx = {};
	currentLabelName = "";
	plugins = {
		jump: function(label){
				this.index = 0;
				this.currentLabelName = label;
				this.parse();
			}
	};


	constructor (){

	}

	setScene (scene){
		this.scene = scene;
		if('characters' in this.scene){
			let { characters } = this.scene;

			characters.forEach((character)=>{
				/*
				 * Вешаем обработчики на id персонажей из списка персонажей
				 * указанного внутри сцены
				 */
				this.on(character.id, (reply)=>{
					/**
					 * Когда обработчик поймает событие в тексте новеллы
					 * то вызовет плагин 'character' и передаст в него
					 * реплику персонажа полученную из новеллы.
					 */
					this.emit('character', character, reply);
				})
			});
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
	parse (ctx){
		//Получаем текущий объект контекста
		this.ctx = ctx || this.scene[this.currentLabelName][this.index];
		this.emit('parse', this.ctx);
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

	start (entryLabel){
		this.currentLabelName = entryLabel;
		this.index = 0;
		this.parse(); 
	};
	next (){

		if(this.ctx === undefined){
			console.log("Конец метки. Нет выхода");
			this.index--;
		}else{
			this.index++;
			this.parse();
		}
	}


};

