var ren = {
	i:0,
	iterator:null,
	label:String,
	layers:{},
	button:{},
	scene:[],
	keys:{},
	keywords:{},
	show_layers:new Object()

}

ren.run = function(game){

	this.game = game;
	
	this.appendChilds();
	this.createLayers();
	this.label = this.game.options.startLabel;
	this.concatKeywords();
	this.navigator();
	this.memoryCard();
	
}
ren.createLayers = function(){
	function create(layer){
		var el = document.createElement('section')
			el.id = layer.id;
			el.style.width = layer.width;
			el.style.height = layer.height;
			el.style.position = 'absolute';
			el.style.display = 'none';
			el.style.border = '3px dotted red';
			el.style.top = layer.top;
			el.style.left = layer.left;
			//el.innerHTML = layer.id;
			//el.style.color = 'red';
			this.layers[layer.parent].appendChild(el)
			this.layers[layer.id] = el;
			
	}
function reg(key){
	this.game.layers[key].id = key;
	create.call(this,this.game.layers[key]);
	/*
		регистрация обработчика объявленных слоев
	*/
	this.show_layers[key] = function(src){
		this.layers[key].style.background = 'url('+this.game.images[src]+')';
		this.layers[key].style.display = 'block';
	}
}

for(var key in this.game.layers){
			reg.call(this,key);
}


/*
________layers.js________

ren.layer['scene'] = {
	parent:this.game.options.el,
	width:600,
	height:400
}
ren.layer['show'] = {
	parent:"scene",
	width:150,
	height:300
}
ren.layer['dialogBox'] = {
	parent:"scene",
	width:600,
	height:100	
}
*/
}
ren.concatKeywords = function(){
	function concat(keywords,functions){
			var c = {};
			var key;
			for (key in keywords) {
				c[key] = keywords[key];
			}
			for(key in functions){
				c[key] = functions[key]
			}
			return c;
	}

//Склеиваю ключевые слова, с объявленными персонажами
/*var Keys = concat(this.keywords,this.game.characters);
	Keys = concat(Keys,this.game.define);
	Keys = concat(Keys,this._layers);*/
	/*
var _keys = [
	this.keywords,
	this.game.characters,
	this._layers,
	this.game.define,
	this.game.animation
];
*/
this.keys = concat(this.keys,this.keywords);
this.keys = concat(this.keys,this.game.characters);
this.keys = concat(this.keys,this.show_layers);
this.keys = concat(this.keys,this.game.define);
this.keys = concat(this.keys,this.game.animation);
/*
_keys.forEach(function(item){
	this.keys = concat(this.keys,item);
	console.log(this.keys)
});*/
/*
var i = 0;
var k = {}
 while(i>=_keys.length-1){
 	var keys = concat(k,_keys[i]);

 	i++;
 	if(i===_keys.length-1){
 		this.keys = keys
 	}
 }

/*
this.keys.prototype.add = function(obj){
			var c = {};
			var key;
			for (key in this) {
				c[key] = this[key];
			}
			for(key in obj){
				c[key] = obj[key]
			}
			this = c
			return this;
	}
}

*/
}
ren.parse = function(param){

	

switch(param){
	case 'prev':
		this.i--;
		break;
	case 'current':
		this.i = this.i;
		break;
	default:
		this.i++;
}
this.scene = this.game.labels[this.label];
//получаю текущий объект из массива label
this.iterator = this.scene[this.i];
//Перебираю	объект this.iterator на наличие ключевых слов
	for(var key in this.iterator){
		//Если это персонаж то:
		if(typeof this.keys[key]==='object'){
			if('name' in this.keys[key]){

				/*this is character*/
			this.keywords.character(this.game.characters[key]);
			this.keywords.phrase(this.iterator[key])
			}
		}
		//Если это функция то вызвыаются ключевые слова.
		if(typeof this.keys[key]==='function'){
			this.keys[key].call(this,this.iterator[key]);
		}

	}
}
ren.appendChilds = function(){
		var body = document.getElementsByTagName('body')[0];
			body.style.backgroundColor = '#263238';
			body.style.overflow = 'hidden';

//background-clip:

		this.layers['scene'] = document.createElement('section');
		this.layers['scene'].id = 'scene';
		this.layers['scene'].style.cssText = "user-select:none;-moz-user-select:none;-webkit-user-select:none;";
		this.layers['scene'].style.position = 'relative';
		this.layers['scene'].style.width = '600px';
		this.layers['scene'].style.height = '400px';
		this.layers['scene'].style.top = '0px';
		this.layers['scene'].style.left = '0px';
		this.layers['scene'].style.border = '1px solid grey';
		this.layers['scene'].style.cursor = 'pointer';

		document.querySelector(this.game.options.elem)
			.appendChild(this.layers.scene)

		this.layers['show'] = document.createElement('section');
		this.layers['show'].id = 'show';
		this.layers['show'].style.position = 'absolute';
		this.layers['show'].style.width = '150px';
		this.layers['show'].style.height = '300px';
		this.layers['show'].style.top = '30px';
		this.layers['show'].style.left = '225px';
		this.layers['show'].style.display = 'none';
		document.getElementById('scene')
			.appendChild(this.layers.show);

		this.layers['nameBox'] = document.createElement('section');
		this.layers['nameBox'].id = 'name_box';
		this.layers['nameBox'].style.position = 'relative';
		this.layers['nameBox'].style.width = '100px';
		this.layers['nameBox'].style.height = '30px';
		this.layers['nameBox'].style.top = '265px';
		this.layers['nameBox'].style.left = '0px';
		this.layers['nameBox'].style.fontSize = '14pt';
		this.layers['nameBox'].style.color = '#999';
		this.layers['nameBox'].style.backgroundColor = 'rgba(0,0,0,0.7)';
		document.getElementById('scene')
			.appendChild(this.layers.nameBox);


		this.layers['dialogBox'] = document.createElement('section');
		this.layers['dialogBox'].id = 'dialog_box';
		this.layers['dialogBox'].style.position = 'relative';
		this.layers['dialogBox'].style.width = '600px';
		this.layers['dialogBox'].style.height = '100px';
		this.layers['dialogBox'].style.top = '270px';
		this.layers['dialogBox'].style.left = '0px';
		this.layers['dialogBox'].style.fontSize = '14pt';
		this.layers['dialogBox'].style.color = '#999';
		this.layers['dialogBox'].style.backgroundColor = 'rgba(0,0,0,0.7)';
		document.getElementById('scene')
			.appendChild(this.layers.dialogBox);

		this.layers['textBox'] = document.createElement('section');
		this.layers['textBox'].id = 'text_box';
		this.layers['textBox'].style.position = 'relative';
		this.layers['textBox'].style.width = '580px';
		this.layers['textBox'].style.height = '100px';

		document.getElementById('dialog_box')
			.appendChild(this.layers.textBox);
		/*
		var wrapper = document.createElement('section');
		wrapper.id = 'wrapper';
		wrapper.style.position = 'absolute';
		wrapper.style.top = '5px';
		wrapper.style.left = '5px';
		wrapper.style.width = '600px';
		wrapper.style.height = '400px';
		// rect( top right bottom left )
		//wrapper.style.cssText ='clip: rect(0px, 600px, 400px, 0px)';
		document.getElementsByTagName('body')[0]
			.appendChild(wrapper);
			*/

		var aside = document.createElement('aside');
			document.body.appendChild(aside);



		this.button['prev'] = document.createElement('button');
		this.button['prev'].id = 'prev';
		this.button['prev'].innerHTML = 'prev';	
		aside.appendChild(this.button['prev']);

		this.button['next'] = document.createElement('button');
		this.button['next'].id = 'next';
		this.button['next'].innerHTML = 'next';
		aside.appendChild(this.button['next']);
}

ren.navigator = function(){




this.handler = function(param){

	
		ren.parse(param);

}	



this.next = function(){
	this.handler('current');
	
	this.layers.scene.addEventListener('mousedown',this.handler);

		this.button['next'].addEventListener('mousedown',this.handler);

/*
if(ren.i===ren.scene.length-1){
	ren.parse('current')
}
else if(ren.i===0){
	ren.parse('current');
}
else {
	ren.parse(param);
}*/
}

this.prev = function(){
		this.button['prev'].addEventListener('mousedown',function(){
				ren.handler('prev');
	});

}

this.next();
if(this.game.options.reverse){
		this.prev();
}
}
ren.memoryCard = function(){
	var aside = document.getElementsByTagName('aside')[0];
	this.button.save = document.createElement('button');
	this.button.save.innerHTML = 'save';
	aside.appendChild(this.button.save);
	this.button.save.addEventListener('mousedown',function(){
			store.set('kasin',{
				i:ren.i,
				label:ren.label,
			});
			alert('Сохранено')
	})




		//_this.layers.scene.style.backgroundImage = 'url('+kserks.scene+')';
		//_this.layers.show.style.backgroundImage = 'url('+kserks.show+')';
		


	var aside = document.getElementsByTagName('aside')[0];
	this.button.load = document.createElement('button');
	this.button.load.innerHTML = 'load';
	aside.appendChild(this.button.load);

	this.button.load.addEventListener('mousedown',function(){

		var kserks = store.get('kasin');
		ren.label = kserks.label;
		ren.i = kserks.i;
		ren.parse('current');
	})

				//show:$('#show')
				//.css('background-image')
					//.replace(/.*\s?url\([\'\"]?/, '')
					//	.replace(/[\'\"]?\).*/, '')
}
ren.keywords["scene"] = function(scene){
	
	if(typeof(scene)==='string'){
		this.layers.scene.style.background = 'url('+this.game.images[scene]+')';
	}
	if(typeof(scene)==='object'){
		this.layers.scene.style.background = 'url('+this.game.images[scene.image]+')';
	}
}
ren.keywords["show"] = function(show){
			this.layers.show.style.display = 'block'

			if(typeof(show)==='string'){
				this.layers.show.style.background = 'url('+this.game.images[show]+')';
				
			}
			if(typeof(show)==='object'){
				this.layers.show.style.background = 'url('+this.game.images[show.image]+')';
			}
}
ren.keywords["phrase"] = function(text){
		ren.layers.textBox.innerHTML = text;
		/*
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

		*/
}
ren.keywords["character"] = function(character){
		ren.layers.nameBox.innerHTML = character.name;
}
ren.keywords["jump"] = function(labelName){
		this.label = labelName;
		this.i = 0;
		this.parse('prev');
}

ren.keywords['menu'] = function(menu){
	/*
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
ren.keywords["audio"] = function(audio){
			var AudioSrc = this.game.audio[audio]
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
}
/* Copyright (c) 2010-2013 Marcus Westin */
"use strict";(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof exports=="object"?module.exports=t():e.store=t()})(this,function(){function o(){try{return r in t&&t[r]}catch(e){return!1}}var e={},t=window,n=t.document,r="localStorage",i="script",s;e.disabled=!1,e.version="1.3.17",e.set=function(e,t){},e.get=function(e,t){},e.has=function(t){return e.get(t)!==undefined},e.remove=function(e){},e.clear=function(){},e.transact=function(t,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=e.get(t,n);r(i),e.set(t,i)},e.getAll=function(){},e.forEach=function(){},e.serialize=function(e){return JSON.stringify(e)},e.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=t[r],e.set=function(t,n){return n===undefined?e.remove(t):(s.setItem(t,e.serialize(n)),n)},e.get=function(t,n){var r=e.deserialize(s.getItem(t));return r===undefined?n:r},e.remove=function(e){s.removeItem(e)},e.clear=function(){s.clear()},e.getAll=function(){var t={};return e.forEach(function(e,n){t[e]=n}),t},e.forEach=function(t){for(var n=0;n<s.length;n++){var r=s.key(n);t(r,e.get(r))}};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="/favicon.ico"></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(t){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=t.apply(e,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),h=function(e){return e.replace(/^d/,"___$&").replace(c,"___")};e.set=l(function(t,n,i){return n=h(n),i===undefined?e.remove(n):(t.setAttribute(n,e.serialize(i)),t.save(r),i)}),e.get=l(function(t,n,r){n=h(n);var i=e.deserialize(t.getAttribute(n));return i===undefined?r:i}),e.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),e.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);while(t.length)e.removeAttribute(t[0].name);e.save(r)}),e.getAll=function(t){var n={};return e.forEach(function(e,t){n[e]=t}),n},e.forEach=l(function(t,n){var r=t.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,e.deserialize(t.getAttribute(s.name)))})}try{var p="__storejs__";e.set(p,p),e.get(p)!=p&&(e.disabled=!0),e.remove(p)}catch(f){e.disabled=!0}return e.enabled=!e.disabled,e})

/*!
 *  howler.js v1.1.26
 *  howlerjs.com
 *
 *  (c) 2013-2015, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
!function(){var e={},o=null,n=!0,t=!1;try{"undefined"!=typeof AudioContext?o=new AudioContext:"undefined"!=typeof webkitAudioContext?o=new webkitAudioContext:n=!1}catch(r){n=!1}if(!n)if("undefined"!=typeof Audio)try{new Audio}catch(r){t=!0}else t=!0;if(n){var a="undefined"==typeof o.createGain?o.createGainNode():o.createGain();a.gain.value=1,a.connect(o.destination)}var i=function(e){this._volume=1,this._muted=!1,this.usingWebAudio=n,this.ctx=o,this.noAudio=t,this._howls=[],this._codecs=e,this.iOSAutoEnable=!0};i.prototype={volume:function(e){var o=this;if(e=parseFloat(e),e>=0&&1>=e){o._volume=e,n&&(a.gain.value=e);for(var t in o._howls)if(o._howls.hasOwnProperty(t)&&o._howls[t]._webAudio===!1)for(var r=0;r<o._howls[t]._audioNode.length;r++)o._howls[t]._audioNode[r].volume=o._howls[t]._volume*o._volume;return o}return n?a.gain.value:o._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var o=this;o._muted=e,n&&(a.gain.value=e?0:o._volume);for(var t in o._howls)if(o._howls.hasOwnProperty(t)&&o._howls[t]._webAudio===!1)for(var r=0;r<o._howls[t]._audioNode.length;r++)o._howls[t]._audioNode[r].muted=e},codecs:function(e){return this._codecs[e]},_enableiOSAudio:function(){var e=this;if(!o||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var n=function(){var t=o.createBuffer(1,1,22050),r=o.createBufferSource();r.buffer=t,r.connect(o.destination),"undefined"==typeof r.start?r.noteOn(0):r.start(0),setTimeout(function(){(r.playbackState===r.PLAYING_STATE||r.playbackState===r.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchstart",n,!1))},0)};return window.addEventListener("touchstart",n,!1),e}}};var u=null,d={};t||(u=new Audio,d={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!u.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(u.canPlayType("audio/x-mp4;")||u.canPlayType("audio/mp4;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")});var l=new i(d),f=function(e){var t=this;t._autoplay=e.autoplay||!1,t._buffer=e.buffer||!1,t._duration=e.duration||0,t._format=e.format||null,t._loop=e.loop||!1,t._loaded=!1,t._sprite=e.sprite||{},t._src=e.src||"",t._pos3d=e.pos3d||[0,0,-.5],t._volume=void 0!==e.volume?e.volume:1,t._urls=e.urls||[],t._rate=e.rate||1,t._model=e.model||null,t._onload=[e.onload||function(){}],t._onloaderror=[e.onloaderror||function(){}],t._onend=[e.onend||function(){}],t._onpause=[e.onpause||function(){}],t._onplay=[e.onplay||function(){}],t._onendTimer=[],t._webAudio=n&&!t._buffer,t._audioNode=[],t._webAudio&&t._setupAudioNode(),"undefined"!=typeof o&&o&&l.iOSAutoEnable&&l._enableiOSAudio(),l._howls.push(t),t.load()};if(f.prototype={load:function(){var e=this,o=null;if(t)return void e.on("loaderror");for(var n=0;n<e._urls.length;n++){var r,a;if(e._format)r=e._format;else{if(a=e._urls[n],r=/^data:audio\/([^;,]+);/i.exec(a),r||(r=/\.([^.]+)$/.exec(a.split("?",1)[0])),!r)return void e.on("loaderror");r=r[1].toLowerCase()}if(d[r]){o=e._urls[n];break}}if(!o)return void e.on("loaderror");if(e._src=o,e._webAudio)_(e,o);else{var u=new Audio;u.addEventListener("error",function(){u.error&&4===u.error.code&&(i.noAudio=!0),e.on("loaderror",{type:u.error?u.error.code:0})},!1),e._audioNode.push(u),u.src=o,u._pos=0,u.preload="auto",u.volume=l._muted?0:e._volume*l.volume();var f=function(){e._duration=Math.ceil(10*u.duration)/10,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play(),u.removeEventListener("canplaythrough",f,!1)};u.addEventListener("canplaythrough",f,!1),u.load()}return e},urls:function(e){var o=this;return e?(o.stop(),o._urls="string"==typeof e?[e]:e,o._loaded=!1,o.load(),o):o._urls},play:function(e,n){var t=this;return"function"==typeof e&&(n=e),e&&"function"!=typeof e||(e="_default"),t._loaded?t._sprite[e]?(t._inactiveNode(function(r){r._sprite=e;var a=r._pos>0?r._pos:t._sprite[e][0]/1e3,i=0;t._webAudio?(i=t._sprite[e][1]/1e3-r._pos,r._pos>0&&(a=t._sprite[e][0]/1e3+a)):i=t._sprite[e][1]/1e3-(a-t._sprite[e][0]/1e3);var u,d=!(!t._loop&&!t._sprite[e][2]),f="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var o={id:f,sprite:e,loop:d};u=setTimeout(function(){!t._webAudio&&d&&t.stop(o.id).play(e,o.id),t._webAudio&&!d&&(t._nodeById(o.id).paused=!0,t._nodeById(o.id)._pos=0,t._clearEndTimer(o.id)),t._webAudio||d||t.stop(o.id),t.on("end",f)},1e3*i),t._onendTimer.push({timer:u,id:o.id})}(),t._webAudio){var _=t._sprite[e][0]/1e3,s=t._sprite[e][1]/1e3;r.id=f,r.paused=!1,p(t,[d,_,s],f),t._playStart=o.currentTime,r.gain.value=t._volume,"undefined"==typeof r.bufferSource.start?d?r.bufferSource.noteGrainOn(0,a,86400):r.bufferSource.noteGrainOn(0,a,i):d?r.bufferSource.start(0,a,86400):r.bufferSource.start(0,a,i)}else{if(4!==r.readyState&&(r.readyState||!navigator.isCocoonJS))return t._clearEndTimer(f),function(){var o=t,a=e,i=n,u=r,d=function(){o.play(a,i),u.removeEventListener("canplaythrough",d,!1)};u.addEventListener("canplaythrough",d,!1)}(),t;r.readyState=4,r.id=f,r.currentTime=a,r.muted=l._muted||r.muted,r.volume=t._volume*l.volume(),setTimeout(function(){r.play()},0)}return t.on("play"),"function"==typeof n&&n(f),t}),t):("function"==typeof n&&n(),t):(t.on("load",function(){t.play(e,n)}),t)},pause:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.pause(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=o.pos(null,e),o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else n.pause();return o.on("pause"),o},stop:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.stop(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=0,o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else isNaN(n.duration)||(n.pause(),n.currentTime=0);return o},mute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.mute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=0:n.muted=!0),o},unmute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.unmute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=o._volume:n.muted=!1),o},volume:function(e,o){var n=this;if(e=parseFloat(e),e>=0&&1>=e){if(n._volume=e,!n._loaded)return n.on("play",function(){n.volume(e,o)}),n;var t=o?n._nodeById(o):n._activeNode();return t&&(n._webAudio?t.gain.value=e:t.volume=e*l.volume()),n}return n._volume},loop:function(e){var o=this;return"boolean"==typeof e?(o._loop=e,o):o._loop},sprite:function(e){var o=this;return"object"==typeof e?(o._sprite=e,o):o._sprite},pos:function(e,n){var t=this;if(!t._loaded)return t.on("load",function(){t.pos(e)}),"number"==typeof e?t:t._pos||0;e=parseFloat(e);var r=n?t._nodeById(n):t._activeNode();if(r)return e>=0?(t.pause(n),r._pos=e,t.play(r._sprite,n),t):t._webAudio?r._pos+(o.currentTime-t._playStart):r.currentTime;if(e>=0)return t;for(var a=0;a<t._audioNode.length;a++)if(t._audioNode[a].paused&&4===t._audioNode[a].readyState)return t._webAudio?t._audioNode[a]._pos:t._audioNode[a].currentTime},pos3d:function(e,o,n,t){var r=this;if(o="undefined"!=typeof o&&o?o:0,n="undefined"!=typeof n&&n?n:-.5,!r._loaded)return r.on("play",function(){r.pos3d(e,o,n,t)}),r;if(!(e>=0||0>e))return r._pos3d;if(r._webAudio){var a=t?r._nodeById(t):r._activeNode();a&&(r._pos3d=[e,o,n],a.panner.setPosition(e,o,n),a.panner.panningModel=r._model||"HRTF")}return r},fade:function(e,o,n,t,r){var a=this,i=Math.abs(e-o),u=e>o?"down":"up",d=i/.01,l=n/d;if(!a._loaded)return a.on("load",function(){a.fade(e,o,n,t,r)}),a;a.volume(e,r);for(var f=1;d>=f;f++)!function(){var e=a._volume+("up"===u?.01:-.01)*f,n=Math.round(1e3*e)/1e3,i=o;setTimeout(function(){a.volume(n,r),n===i&&t&&t()},l*f)}()},fadeIn:function(e,o,n){return this.volume(0).play().fade(0,e,o,n)},fadeOut:function(e,o,n,t){var r=this;return r.fade(r._volume,e,o,function(){n&&n(),r.pause(t),r.on("end")},t)},_nodeById:function(e){for(var o=this,n=o._audioNode[0],t=0;t<o._audioNode.length;t++)if(o._audioNode[t].id===e){n=o._audioNode[t];break}return n},_activeNode:function(){for(var e=this,o=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){o=e._audioNode[n];break}return e._drainPool(),o},_inactiveNode:function(e){for(var o=this,n=null,t=0;t<o._audioNode.length;t++)if(o._audioNode[t].paused&&4===o._audioNode[t].readyState){e(o._audioNode[t]),n=!0;break}if(o._drainPool(),!n){var r;if(o._webAudio)r=o._setupAudioNode(),e(r);else{o.load(),r=o._audioNode[o._audioNode.length-1];var a=navigator.isCocoonJS?"canplaythrough":"loadedmetadata",i=function(){r.removeEventListener(a,i,!1),e(r)};r.addEventListener(a,i,!1)}}},_drainPool:function(){var e,o=this,n=0;for(e=0;e<o._audioNode.length;e++)o._audioNode[e].paused&&n++;for(e=o._audioNode.length-1;e>=0&&!(5>=n);e--)o._audioNode[e].paused&&(o._webAudio&&o._audioNode[e].disconnect(0),n--,o._audioNode.splice(e,1))},_clearEndTimer:function(e){for(var o=this,n=0,t=0;t<o._onendTimer.length;t++)if(o._onendTimer[t].id===e){n=t;break}var r=o._onendTimer[n];r&&(clearTimeout(r.timer),o._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,t=e._audioNode.length;return n[t]="undefined"==typeof o.createGain?o.createGainNode():o.createGain(),n[t].gain.value=e._volume,n[t].paused=!0,n[t]._pos=0,n[t].readyState=4,n[t].connect(a),n[t].panner=o.createPanner(),n[t].panner.panningModel=e._model||"equalpower",n[t].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[t].panner.connect(n[t]),n[t]},on:function(e,o){var n=this,t=n["_on"+e];if("function"==typeof o)t.push(o);else for(var r=0;r<t.length;r++)o?t[r].call(n,o):t[r].call(n);return n},off:function(e,o){var n=this,t=n["_on"+e],r=o?o.toString():null;if(r){for(var a=0;a<t.length;a++)if(r===t[a].toString()){t.splice(a,1);break}}else n["_on"+e]=[];return n},unload:function(){for(var o=this,n=o._audioNode,t=0;t<o._audioNode.length;t++)n[t].paused||(o.stop(n[t].id),o.on("end",n[t].id)),o._webAudio?n[t].disconnect(0):n[t].src="";for(t=0;t<o._onendTimer.length;t++)clearTimeout(o._onendTimer[t].timer);var r=l._howls.indexOf(o);null!==r&&r>=0&&l._howls.splice(r,1),delete e[o._src],o=null}},n)var _=function(o,n){if(n in e)return o._duration=e[n].duration,void c(o);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),r=new Uint8Array(t.length),a=0;a<t.length;++a)r[a]=t.charCodeAt(a);s(r.buffer,o,n)}else{var i=new XMLHttpRequest;i.open("GET",n,!0),i.responseType="arraybuffer",i.onload=function(){s(i.response,o,n)},i.onerror=function(){o._webAudio&&(o._buffer=!0,o._webAudio=!1,o._audioNode=[],delete o._gainNode,delete e[n],o.load())};try{i.send()}catch(u){i.onerror()}}},s=function(n,t,r){o.decodeAudioData(n,function(o){o&&(e[r]=o,c(t,o))},function(e){t.on("loaderror")})},c=function(e,o){e._duration=o?o.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},p=function(n,t,r){var a=n._nodeById(r);a.bufferSource=o.createBufferSource(),a.bufferSource.buffer=e[n._src],a.bufferSource.connect(a.panner),a.bufferSource.loop=t[0],t[0]&&(a.bufferSource.loopStart=t[1],a.bufferSource.loopEnd=t[1]+t[2]),a.bufferSource.playbackRate.value=n._rate};"function"==typeof define&&define.amd&&define(function(){return{Howler:l,Howl:f}}),"undefined"!=typeof exports&&(exports.Howler=l,exports.Howl=f),"undefined"!=typeof window&&(window.Howler=l,window.Howl=f)}();

(function(){function require(path,parent,orig){var resolved=require.resolve(path);if(null==resolved){orig=orig||path;parent=parent||"root";var err=new Error('Failed to require "'+orig+'" from "'+parent+'"');err.path=orig;err.parent=parent;err.require=true;throw err}var module=require.modules[resolved];if(!module.exports){module.exports={};module.client=module.component=true;module.call(this,module.exports,require.relative(resolved),module)}return module.exports}require.modules={};require.aliases={};require.resolve=function(path){if(path.charAt(0)==="/")path=path.slice(1);var paths=[path,path+".js",path+".json",path+"/index.js",path+"/index.json"];for(var i=0;i<paths.length;i++){var path=paths[i];if(require.modules.hasOwnProperty(path))return path;if(require.aliases.hasOwnProperty(path))return require.aliases[path]}};require.normalize=function(curr,path){var segs=[];if("."!=path.charAt(0))return path;curr=curr.split("/");path=path.split("/");for(var i=0;i<path.length;++i){if(".."==path[i]){curr.pop()}else if("."!=path[i]&&""!=path[i]){segs.push(path[i])}}return curr.concat(segs).join("/")};require.register=function(path,definition){require.modules[path]=definition};require.alias=function(from,to){if(!require.modules.hasOwnProperty(from)){throw new Error('Failed to alias "'+from+'", it does not exist')}require.aliases[to]=from};require.relative=function(parent){var p=require.normalize(parent,"..");function lastIndexOf(arr,obj){var i=arr.length;while(i--){if(arr[i]===obj)return i}return-1}function localRequire(path){var resolved=localRequire.resolve(path);return require(resolved,parent,path)}localRequire.resolve=function(path){var c=path.charAt(0);if("/"==c)return path.slice(1);if("."==c)return require.normalize(p,path);var segs=parent.split("/");var i=lastIndexOf(segs,"deps")+1;if(!i)i=0;path=segs.slice(0,i+1).join("/")+"/deps/"+path;return path};localRequire.exists=function(path){return require.modules.hasOwnProperty(localRequire.resolve(path))};return localRequire};require.register("component-transform-property/index.js",function(exports,require,module){var styles=["webkitTransform","MozTransform","msTransform","OTransform","transform"];var el=document.createElement("p");var style;for(var i=0;i<styles.length;i++){style=styles[i];if(null!=el.style[style]){module.exports=style;break}}});require.register("component-has-translate3d/index.js",function(exports,require,module){var prop=require("transform-property");if(!prop||!window.getComputedStyle){module.exports=false}else{var map={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};var el=document.createElement("div");el.style[prop]="translate3d(1px,1px,1px)";document.body.insertBefore(el,null);var val=getComputedStyle(el).getPropertyValue(map[prop]);document.body.removeChild(el);module.exports=null!=val&&val.length&&"none"!=val}});require.register("yields-has-transitions/index.js",function(exports,require,module){exports=module.exports=function(el){switch(arguments.length){case 0:return bool;case 1:return bool?transitions(el):bool}};function transitions(el,styl){if(el.transition)return true;styl=window.getComputedStyle(el);return!!parseFloat(styl.transitionDuration,10)}var styl=document.body.style;var bool="transition"in styl||"webkitTransition"in styl||"MozTransition"in styl||"msTransition"in styl});require.register("component-event/index.js",function(exports,require,module){var bind=window.addEventListener?"addEventListener":"attachEvent",unbind=window.removeEventListener?"removeEventListener":"detachEvent",prefix=bind!=="addEventListener"?"on":"";exports.bind=function(el,type,fn,capture){el[bind](prefix+type,fn,capture||false);return fn};exports.unbind=function(el,type,fn,capture){el[unbind](prefix+type,fn,capture||false);return fn}});require.register("ecarter-css-emitter/index.js",function(exports,require,module){var events=require("event");var watch=["transitionend","webkitTransitionEnd","oTransitionEnd","MSTransitionEnd","animationend","webkitAnimationEnd","oAnimationEnd","MSAnimationEnd"];module.exports=CssEmitter;function CssEmitter(element){if(!(this instanceof CssEmitter))return new CssEmitter(element);this.el=element}CssEmitter.prototype.bind=function(fn){for(var i=0;i<watch.length;i++){events.bind(this.el,watch[i],fn)}return this};CssEmitter.prototype.unbind=function(fn){for(var i=0;i<watch.length;i++){events.unbind(this.el,watch[i],fn)}return this};CssEmitter.prototype.once=function(fn){var self=this;function on(){self.unbind(on);fn.apply(self.el,arguments)}self.bind(on);return this}});require.register("component-once/index.js",function(exports,require,module){var n=0;var global=function(){return this}();module.exports=function(fn){var id=n++;var called;function once(){if(this==global){if(called)return;called=true;return fn.apply(this,arguments)}var key="__called_"+id+"__";if(this[key])return;this[key]=true;return fn.apply(this,arguments)}return once}});require.register("yields-after-transition/index.js",function(exports,require,module){var has=require("has-transitions"),emitter=require("css-emitter"),once=require("once");var supported=has();module.exports=after;function after(el,fn){if(!supported||!has(el))return fn();emitter(el).bind(fn);return fn}after.once=function(el,fn){var callback=once(fn);after(el,fn=function(){emitter(el).unbind(fn);callback()})}});require.register("component-emitter/index.js",function(exports,require,module){module.exports=Emitter;function Emitter(obj){if(obj)return mixin(obj)}function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key]}return obj}Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks[event]=this._callbacks[event]||[]).push(fn);return this};Emitter.prototype.once=function(event,fn){var self=this;this._callbacks=this._callbacks||{};function on(){self.off(event,on);fn.apply(this,arguments)}on.fn=fn;this.on(event,on);return this};Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}var callbacks=this._callbacks[event];if(!callbacks)return this;if(1==arguments.length){delete this._callbacks[event];return this}var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break}}return this};Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args)}}return this};Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks[event]||[]};Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length}});require.register("yields-css-ease/index.js",function(exports,require,module){module.exports={"in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"}});require.register("component-query/index.js",function(exports,require,module){function one(selector,el){return el.querySelector(selector)}exports=module.exports=function(selector,el){el=el||document;return one(selector,el)};exports.all=function(selector,el){el=el||document;return el.querySelectorAll(selector)};exports.engine=function(obj){if(!obj.one)throw new Error(".one callback required");if(!obj.all)throw new Error(".all callback required");one=obj.one;exports.all=obj.all;return exports}});require.register("move/index.js",function(exports,require,module){var after=require("after-transition");var has3d=require("has-translate3d");var Emitter=require("emitter");var ease=require("css-ease");var query=require("query");var translate=has3d?["translate3d(",", 0)"]:["translate(",")"];module.exports=Move;var style=window.getComputedStyle||window.currentStyle;Move.version="0.3.2";Move.ease=ease;Move.defaults={duration:500};Move.select=function(selector){if("string"!=typeof selector)return selector;return query(selector)};function Move(el){if(!(this instanceof Move))return new Move(el);if("string"==typeof el)el=query(el);if(!el)throw new TypeError("Move must be initialized with element or selector");this.el=el;this._props={};this._rotate=0;this._transitionProps=[];this._transforms=[];this.duration(Move.defaults.duration)}Emitter(Move.prototype);Move.prototype.transform=function(transform){this._transforms.push(transform);return this};Move.prototype.skew=function(x,y){return this.transform("skew("+x+"deg, "+(y||0)+"deg)")};Move.prototype.skewX=function(n){return this.transform("skewX("+n+"deg)")};Move.prototype.skewY=function(n){return this.transform("skewY("+n+"deg)")};Move.prototype.translate=Move.prototype.to=function(x,y){return this.transform(translate.join(""+x+"px, "+(y||0)+"px"))};Move.prototype.translateX=Move.prototype.x=function(n){return this.transform("translateX("+n+"px)")};Move.prototype.translateY=Move.prototype.y=function(n){return this.transform("translateY("+n+"px)")};Move.prototype.scale=function(x,y){return this.transform("scale("+x+", "+(y||x)+")")};Move.prototype.scaleX=function(n){return this.transform("scaleX("+n+")")};Move.prototype.matrix=function(m11,m12,m21,m22,m31,m32){return this.transform("matrix("+[m11,m12,m21,m22,m31,m32].join(",")+")")};Move.prototype.scaleY=function(n){return this.transform("scaleY("+n+")")};Move.prototype.rotate=function(n){return this.transform("rotate("+n+"deg)")};Move.prototype.ease=function(fn){fn=ease[fn]||fn||"ease";return this.setVendorProperty("transition-timing-function",fn)};Move.prototype.animate=function(name,props){for(var i in props){if(props.hasOwnProperty(i)){this.setVendorProperty("animation-"+i,props[i])}}return this.setVendorProperty("animation-name",name)};Move.prototype.duration=function(n){n=this._duration="string"==typeof n?parseFloat(n)*1e3:n;return this.setVendorProperty("transition-duration",n+"ms")};Move.prototype.delay=function(n){n="string"==typeof n?parseFloat(n)*1e3:n;return this.setVendorProperty("transition-delay",n+"ms")};Move.prototype.setProperty=function(prop,val){this._props[prop]=val;return this};Move.prototype.setVendorProperty=function(prop,val){this.setProperty("-webkit-"+prop,val);this.setProperty("-moz-"+prop,val);this.setProperty("-ms-"+prop,val);this.setProperty("-o-"+prop,val);return this};Move.prototype.set=function(prop,val){this.transition(prop);this._props[prop]=val;return this};Move.prototype.add=function(prop,val){if(!style)return;var self=this;return this.on("start",function(){var curr=parseInt(self.current(prop),10);self.set(prop,curr+val+"px")})};Move.prototype.sub=function(prop,val){if(!style)return;var self=this;return this.on("start",function(){var curr=parseInt(self.current(prop),10);self.set(prop,curr-val+"px")})};Move.prototype.current=function(prop){return style(this.el).getPropertyValue(prop)};Move.prototype.transition=function(prop){if(!this._transitionProps.indexOf(prop))return this;this._transitionProps.push(prop);return this};Move.prototype.applyProperties=function(){for(var prop in this._props){this.el.style.setProperty(prop,this._props[prop],"")}return this};Move.prototype.move=Move.prototype.select=function(selector){this.el=Move.select(selector);return this};Move.prototype.then=function(fn){if(fn instanceof Move){this.on("end",function(){fn.end()})}else if("function"==typeof fn){this.on("end",fn)}else{var clone=new Move(this.el);clone._transforms=this._transforms.slice(0);this.then(clone);clone.parent=this;return clone}return this};Move.prototype.pop=function(){return this.parent};Move.prototype.reset=function(){this.el.style.webkitTransitionDuration=this.el.style.mozTransitionDuration=this.el.style.msTransitionDuration=this.el.style.oTransitionDuration="";return this};Move.prototype.end=function(fn){var self=this;this.emit("start");if(this._transforms.length){this.setVendorProperty("transform",this._transforms.join(" "))}this.setVendorProperty("transition-properties",this._transitionProps.join(", "));this.applyProperties();if(fn)this.then(fn);after.once(this.el,function(){self.reset();self.emit("end")});return this}});require.alias("component-has-translate3d/index.js","move/deps/has-translate3d/index.js");require.alias("component-has-translate3d/index.js","has-translate3d/index.js");require.alias("component-transform-property/index.js","component-has-translate3d/deps/transform-property/index.js");require.alias("yields-after-transition/index.js","move/deps/after-transition/index.js");require.alias("yields-after-transition/index.js","move/deps/after-transition/index.js");require.alias("yields-after-transition/index.js","after-transition/index.js");require.alias("yields-has-transitions/index.js","yields-after-transition/deps/has-transitions/index.js");require.alias("yields-has-transitions/index.js","yields-after-transition/deps/has-transitions/index.js");require.alias("yields-has-transitions/index.js","yields-has-transitions/index.js");require.alias("ecarter-css-emitter/index.js","yields-after-transition/deps/css-emitter/index.js");require.alias("component-event/index.js","ecarter-css-emitter/deps/event/index.js");require.alias("component-once/index.js","yields-after-transition/deps/once/index.js");require.alias("yields-after-transition/index.js","yields-after-transition/index.js");require.alias("component-emitter/index.js","move/deps/emitter/index.js");require.alias("component-emitter/index.js","emitter/index.js");require.alias("yields-css-ease/index.js","move/deps/css-ease/index.js");require.alias("yields-css-ease/index.js","move/deps/css-ease/index.js");require.alias("yields-css-ease/index.js","css-ease/index.js");require.alias("yields-css-ease/index.js","yields-css-ease/index.js");require.alias("component-query/index.js","move/deps/query/index.js");require.alias("component-query/index.js","query/index.js");if(typeof exports=="object"){module.exports=require("move")}else if(typeof define=="function"&&define.amd){define(function(){return require("move")})}else{this["move"]=require("move")}})();
