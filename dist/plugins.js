/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _alias = __webpack_require__(1);
	
	var _alias2 = _interopRequireDefault(_alias);
	
	var _audio = __webpack_require__(2);
	
	var _audio2 = _interopRequireDefault(_audio);
	
	var _center = __webpack_require__(3);
	
	var _center2 = _interopRequireDefault(_center);
	
	var _debug = __webpack_require__(4);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _jump = __webpack_require__(5);
	
	var _jump2 = _interopRequireDefault(_jump);
	
	var _left = __webpack_require__(6);
	
	var _left2 = _interopRequireDefault(_left);
	
	var _right = __webpack_require__(7);
	
	var _right2 = _interopRequireDefault(_right);
	
	var _scene = __webpack_require__(8);
	
	var _scene2 = _interopRequireDefault(_scene);
	
	var _sound = __webpack_require__(9);
	
	var _sound2 = _interopRequireDefault(_sound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.alias = function (character, reply) {
	  var nameBox = document.getElementById('name_box');
	  var textBox = document.getElementById('text_box');
	  nameBox.innerHTML = character.name;
	  nameBox.style.color = character.color;
	
	  var ctx = this.ctx;
	  var game = this.game;
	  var catalog = this.catalog;
	  var parse = this.parse;
	
	  var screen = document.getElementById(game.init.screen);
	
	  var speed = 0;
	  var i = 0;
	
	  if (speed != 0) {
	    var print = function print() {
	      /* screen.removeEventListener('mousedown',function(){
	           parse(ctx, catalog);
	       },false);*/
	      textBox.innerHTML += reply[i];
	
	      i++;
	
	      if (i > reply.length - 1) {
	        clearInterval(intId);
	        /*   screen.addEventListener('mousedown', function(){
	          parse(ctx, catalog);
	        }); */
	      }
	    };
	
	    textBox.innerHTML = "";
	
	    var intId = setInterval(print, speed);
	  } else {
	    textBox.innerHTML = reply;
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on('audio', function (data, event) {
	  /* var sound = new Howl({
	   src: ['/game/assets/'+data+'.mp3']
	  });
	  
	  sound.play();*/
	
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on('center', function (data, event) {
	  var center = document.getElementById('center');
	  center.style.background = 'url(/game/assets/' + data + '.png)';
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on(function () {
	  console.error('[warn] {autorun} запускается два раза по загрузке сцены');
	  /*var gui = new dat.gui.GUI();
	  let { ctx, game, parse, catalog } = vnjs;
	  
	    let obj = {
	          head: {
	            title: 'vnjson@0.4.3',
	          },
	          'parse()': ()=>{
	            parse(ctx, catalog);
	          },
	  
	          audio: false,
	          characters: ()=>{
	            return game.scenes[ctx.scene].characters;
	          },
	          pathname: `${ctx.scene}/${ctx.label}/${ctx.num}`
	      };
	  
	    
	      
	  
	  
	      gui.add(obj.head, 'title');
	      gui.add(obj, 'parse()');
	      gui.add(obj, 'characters');
	      gui.add(obj, 'audio');
	      gui.add(obj, 'pathname');
	  
	     */
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*vnjs.jump = function(pathname){
	  var ctx = this.ctx;
	  var game = vnjs.game;

	let isScene = /\/\w+/gi.test(pathname);

	if(isScene){
	   console.info(`[ ${pathname} ]`);
	  const pathArr = pathname.split('/');
	  ctx.num = 0;
	  ctx.scene = pathArr[0];
	  ctx.label  = pathArr[1];
	 
	  this.getScene(ctx.scene);

	 
	}

	else{
	 
	   ctx.num = 0;
	   ctx.label = pathname;
	   ctx.arr = game.scenes[ctx.scene].labels[ctx.label];
	   console.warn('[ is label ]: '+pathname);
	   this.parse(ctx, this.catalog);
	};
	};*/
	"use strict";

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on('left', function (data, event) {
	  var left = document.getElementById('left');
	  left.style.background = 'url(/game/assets/' + data + '.png)';
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on('right', function (data, event) {
	  var right = document.getElementById('right');
	  right.style.background = 'url(/game/assets/' + data + '.png)';
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on('scene', function (data, event) {
	          var scene = document.getElementById('scene');
	          scene.style.background = 'url(/game/assets/' + data + '.png)';
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	vnjs.on('sound', function (data, event) {
	  /*var sound = new Howl({
	  src: ['/game/assets/'+data+'.mp3']
	  });
	  sound.play();*/
	});

/***/ }
/******/ ]);
//# sourceMappingURL=plugins.js.map