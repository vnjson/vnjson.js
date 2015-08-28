function RenJs (game){
	this.game = game;
	this.i = 0;
	this.label = game.options['startLabel']
	this.images = game.images
		
	function imagePreload(){
		for(var key in this.images){
		var	img = new Image()
			img.src = this.images[key]
					
		}	
	};
	imagePreload.call(this);

	function getScripts(arr){
		function includeJS(src){
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
				script.charset = 'utf-8';
				script.src = src;
				head.appendChild(script);
		}
			arr.forEach(function(uri){
				includeJS(uri);
			});
				
	}
	getScripts(this.game.scripts);
	
	function init(){
		var el = this.game.options.el;
		var _this = this;
			_this.parse();

		$(el).mousedown(function(){
			_this.parse();
		});


	}
	
	init.call(this);
	
	this.memoryCard();
}


RenJs.prototype.parse = function(){
	var label = this.game.labels[this.label]
	this.interator = label[this.i];
	var	key = null;

		this.i++;

//game.define + this.keywords
/* Склеиваю пользовательские ключевые слова с основными*/
function concat(keywords,functions){
var c = {},
	key;
	for (key in keywords) {
		c[key] = keywords[key];
	}
	for(key in functions){
		c[key] = functions[key]
	}
	return c;
}

var keywords = concat(this.keywords,this.game.define)

/*перебераю методы объекта interator {aliase:'pr',text:'hello'}*/
	for(key in this.interator){
		keywords[key].call(this,this.interator[key])
	}

/*Конец новеллы*/
//this.i===undefined/*>label.length*/&&alert('Конец')
}
RenJs.prototype.layers = {
	scene:document.getElementById('scene'),
	show:document.getElementById('show'),
	name_box:document.getElementById('name_box'),
	text_box:document.getElementById('text_box')

}
RenJs.prototype.memoryCard = function(){
	var _this = this;
	$('#save').click(function(){
		store.set('kasin',{
			i:_this.i,
			label:_this.label,
			scene:$('#scene')
				.css('background-image')
					.replace(/.*\s?url\([\'\"]?/, '')
						.replace(/[\'\"]?\).*/, ''),
			show:$('#show')
				.css('background-image')
					.replace(/.*\s?url\([\'\"]?/, '')
						.replace(/[\'\"]?\).*/, '')
		});
		alert('Сохранено')
	});

	$('#load').click(function(){
	var kserks = store.get('kasin');
		_this.label = kserks.label;
		_this.i = kserks.i;
		_this.i -=1;
		_this.parse();

		_this.layers.scene.style.backgroundImage = 'url('+kserks.scene+')';
		_this.layers.show.style.backgroundImage = 'url('+kserks.show+')';
		$('#menu').hide();
	});
	
	// .todo
	/*
		Сохранять так же слои dialog_box
		audio  и прочие элементы на сцене в текущей позиции.
	*/
}
RenJs.prototype.keywords = {

		jump:function(jump){
			this.label = jump;
			this.i = 0
		},
		audio:function(audio){
			var AudioSrc = this.game.audio[audio]
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
		},
		sound:function(sound){
			var SoundSrc = this.game.audio[sound]
			new Howl({
 				urls: [SoundSrc],
 				loop:false
			}).play();
		},
		
}
RenJs.prototype.keywords['menu'] = function(menu){
			var menuLi = []
			var _this = this;

			$('#scene').append('<div id="menu"></div>')
			$('#menu').css({
				width:600,
				height:400,
				backgroundColor:'rgba(0,0,0,0.7)',
				position:'absolute',
				top:0,
				left:0
			})
				for(var key in menu){
						menuLi.push(key)
						//console.log(key+': '+menu[key])
						$('#menu').append('<li data-label="'+menu[key]+'">'+key+'</li>')
				}
				$('#menu li').css({
					backgroundColor:'rgba(0,0,100,0.8)',
					color:'#999'
				})

				function callback(){
					
					_this.label = $(this).attr('data-label')
					_this.i = 0;
					//_this.parse()
					$('#menu').remove()
				}
				$('#menu').delegate('li','mousedown',callback)
	
				/*-- Отсюда могу кликать по нижнему слою и новелла идет дальше..*/
}



RenJs.prototype.keywords['scene'] = function(scene){
	
	if(typeof(scene)==='string'){
		this.layers.scene.style.background = 'url('+this.game.images[scene]+')'
	}
	if(typeof(scene)==='object'){
		this.layers.scene.style.background = 'url('+this.game.images[scene.image]+')'
	}
}
RenJs.prototype.keywords['show'] = function(show){
			this.layers.show.style.display = 'block'

			if(typeof(show)==='string'){
				this.layers.show.style.background = 'url('+this.game.images[show]+')';
				
			}
			if(typeof(show)==='object'){
				this.layers.show.style.background = 'url('+this.game.images[show.image]+')';
			}
}
RenJs.prototype.keywords['text'] = function(text){

	var speed = this.game.options.textSpeed;
	var i = 0;
	var _this = this;
	
if(speed != 0){
		this.layers.text_box.innerHTML = "";

		function print(){
		_this.layers.text_box.innerHTML += text[i];
		
		i++
		if(i>text.length-1){
			clearInterval(intId)
		}
	}
	var intId = setInterval(print,speed)	
}
else {
	this.layers.text_box.innerHTML = text;
}

}
RenJs.prototype.keywords['aliase'] = function(aliase){
			var character = this.game.characters[aliase]
			this.layers.name_box.innerHTML = character.name
			this.layers.name_box.style.color = character.color
			this.layers.text_box.style.color = character.textColor
}