var vnjs =
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @deps [ marmottajax.js]
	 *       [ minivents.js]
	         [ smart-observer.js]
	 */
	var game = {
	  init: {},
	  scenes: {},
	  characters: {}
	};
	
	/*
	 * context
	 * Значение объекта равно состоянию приложения.
	 */
	var ctx = {
	  scene: 'scene',
	  label: 'label',
	  arr: [],
	  obj: null,
	  num: 0
	};
	/*
	 * 
	 */
	var utils = {};
	var config = {};
	var ev = new Events(); //EventEmitter
	/**
	 * init
	 */
	function init(param) {
	
	  exports.config = config = param;
	  /*
	   * Загружаю слои в главный файл
	   */
	  marmottajax('/game/layers.html').success(function (body) {
	    document.getElementById('game').innerHTML = body;
	    /*
	     * Здесь срабатывает autorun
	     */
	    ev.emit('autorun', { name: 'autorun' });
	    /*
	     * Во время первого запуска нужно
	     * запустить точку входа.
	     * Здесь это и присходит. Ставлю обработчик
	     * события (jump) и передаю контекст
	     */
	    ev.emit.call(vnjs, 'jump', config.entry);
	  });
	};
	
	/**
	 * @plugins
	 * Регистратор пользовательских событий
	 */
	
	function on(event, handler) {
	
	  if (typeof event === "function") {
	    ev.on('autorun', event, vnjs);
	  } else if (typeof event === "string") {
	    ev.on(event, handler, vnjs);
	  }
	};
	
	/*
	 * getScene
	 */
	
	function getScene(scene) {
	
	  var pathToScene = 'game/' + config.scenes + '/' + config.local + '/' + scene + '.json';
	  /*
	   * Излучаю событие preload что бы было можно повесить
	   * идикатор загрузки на css
	   */
	  ev.emit('preload', { name: 'preload', msg: '${scene} start loading!' });
	  marmottajax({
	    url: pathToScene,
	    json: true
	  }).success(function (data) {
	    /*
	     * Назначаем полученные данные сцены в
	     * игровые объекты.
	     * А так же объекты внутреннего назначения
	     */
	    game.scenes[ctx.scene] = data;
	
	    var _SCENE = game.scenes[ctx.scene];
	    /*
	     * Добавляю персонажей в каждой загруженной сцены
	     * в общий пулл.
	     */
	    game.characters = Object.assign(game.characters, _SCENE.characters);
	    /*
	     * Дублирую текущие значения в контекст
	     */
	    ctx.arr = _SCENE.labels[ctx.label];
	    //ctx.assets = game.scenes[ctx.scene].assets;
	
	    ev.emit('loaded', { name: 'load', msg: '${scene} is loaded!' });
	  });
	};
	
	function parse() {
	  /** Текущий объект */
	  ctx.obj = ctx.arr[ctx.num];
	
	  /*if(ctx.arr.length-1>=ctx.num){
	    console.log(ctx.obj)
	  }else{
	    console.log('Массив окончен')
	  }
	  */
	
	  for (var key in ctx.obj) {
	
	    if (key.length <= 2) {
	      var character = game.characters[key];
	
	      var reply = ctx.obj[key];
	      ev.emit('alias', {
	        character: character,
	        reply: reply,
	        aliase: key
	      });
	    } else {
	      ev.emit(key, ctx.obj[key]);
	    }
	  }
	};
	
	function next() {
	
	  parse();
	  ctx.num += 1;
	  ev.emit('next', { name: 'next' });
	};
	function prev() {
	
	  parse();
	  ctx.num -= 1;
	  ev.emit('prev', { name: 'prev' });
	};
	
	/*
	 * @api
	 * @version 0.5.7
	 */
	exports.on = on;
	exports.ctx = ctx;
	exports.init = init;
	exports.game = game;
	exports.getScene = getScene;
	exports.config = config;
	exports.utils = utils;
	exports.next = next;
	exports.prev = prev;
	exports.parse = parse;

/***/ }
/******/ ]);
//# sourceMappingURL=vnjson.js.map