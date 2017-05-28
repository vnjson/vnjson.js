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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = exports.off = exports.emit = exports.parse = exports.prev = exports.next = exports.plugin = exports.config = exports.setLabel = exports.setScene = exports.game = exports.ctx = exports.on = undefined;
	
	var _minivents = __webpack_require__(1);
	
	var _minivents2 = _interopRequireDefault(_minivents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * context
	 * Значение объекта равно состоянию приложения.
	 */
	var ctx = {
	  sceneName: 'scene',
	  label: 'label',
	  scene: {},
	  arr: [],
	  obj: null,
	  num: 0
	};
	
	var plugin = new Object();
	
	//конфигурацию тоже сохранять в memory-card
	var config = {};
	
	function init(_config) {
	  exports.config = config = _config;
	
	  emit('init', config);
	
	  return this;
	};
	
	var game = {
	  scenes: {}
	};
	
	var ev = new _minivents2.default(); //EventEmitter
	var emit = ev.emit;
	var off = ev.off;
	
	/**
	 * @plugins
	 * Регистратор пользовательских событий
	 */
	/*
	 * Объект plugin нужен для тестирования
	 * что бы можно было вызывать плагин из
	 * текущего окружения, а не плодить глобальные
	 * методы.
	 */
	
	function on(event, handler) {
	  /*
	   * Если функция vnjs.on(function(){})
	   * содержит callback без объявления
	   * имени события, то функция запускается
	   * в резиме autorun;
	   */
	  if (typeof event === "function") {
	    ev.on('autorun', event, vnjs);
	  } else if (typeof event === "string") {
	    plugin[event] = handler;
	    ev.on(event, handler, vnjs);
	  }
	};
	
	/*
	 * setScene
	 * @Функция принимает объект сцены
	 */
	function setScene(sceneName, sceneObject) {
	  try {
	
	    /*
	     * Назначаем полученные данные сцены в
	     * игровые объекты.
	     * А так же объекты внутреннего назначения
	     */
	    game.scenes[sceneName] = sceneObject;
	    ctx.scene = sceneObject;
	
	    /*
	     * Переопределяю методы текущего label'a
	     */
	    setLabel(ctx.label, sceneObject[ctx.label]);
	    emit('setscene');
	    parse();
	
	    return this;
	  } catch (err) {
	    throw new Error('Ошибка объявления сцены ', err);
	    return false;
	  }
	};
	
	function setLabel(labelName, labelArray) {
	  ctx.label = labelName;
	  ctx.arr = labelArray;
	  return true;
	};
	
	function parse(_obj) {
	
	  if (_obj) {
	    ctx.obj = _obj;
	  } else {
	    ctx.obj = ctx.arr[ctx.num];
	  }
	  /** Текущий объект */
	  //ctx.obj = ctx.arr[ctx.num];
	
	
	  for (var key in ctx.obj) {
	    /*
	           * vnjs.on('alert')
	           * Подписывает пользовательские плагины
	           * 
	           */
	    ev.emit(key, ctx.obj[key]);
	  }
	  emit('parse', ctx.obj);
	
	  return ctx.num;
	};
	
	function next(num) {
	
	  ctx.num += num || 1;
	  parse();
	  emit('next');
	  return ctx.num;
	};
	function prev(num) {
	
	  ctx.num -= num || 1;
	  parse();
	  emit('prev');
	  return ctx.num;
	};
	
	/*
	 * @api
	 */
	exports.on = on;
	exports.ctx = ctx;
	exports.game = game;
	exports.setScene = setScene;
	exports.setLabel = setLabel;
	exports.config = config;
	exports.plugin = plugin;
	exports.next = next;
	exports.prev = prev;
	exports.parse = parse;
	exports.emit = emit;
	exports.off = off;
	exports.init = init;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Events(target) {
	  var events = {},
	      empty = [];
	  target = target || this;
	  /**
	   *  On: listen to events
	   */
	  target.on = function (type, func, ctx) {
	    (events[type] = events[type] || []).push([func, ctx]);
	  };
	  /**
	   *  Off: stop listening to event / specific callback
	   */
	  target.off = function (type, func) {
	    type || (events = {});
	    var list = events[type] || empty,
	        i = list.length = func ? list.length : 0;
	    while (i--) {
	      func == list[i][0] && list.splice(i, 1);
	    }
	  };
	  /** 
	   * Emit: send event, callbacks will be triggered
	   */
	  target.emit = function (type) {
	    var e = events[type] || empty,
	        list = e.length > 0 ? e.slice(0, e.length) : e,
	        i = 0,
	        j;
	    while (j = list[i++]) {
	      j[0].apply(j[1], empty.slice.call(arguments, 1));
	    }
	  };
	};
	
	exports.default = Events;

/***/ }
/******/ ]);
//# sourceMappingURL=vnjson.js.map