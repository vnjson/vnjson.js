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
	exports.emit = exports.parse = exports.prev = exports.next = exports.util = exports.plugin = exports.option = exports.setLabel = exports.setScene = exports.game = exports.ctx = exports.on = undefined;
	
	var _minivents = __webpack_require__(1);
	
	var _minivents2 = _interopRequireDefault(_minivents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var plugin = new Object();
	var option = new Object();
	
	var game = {
	  init: {},
	  scenes: {},
	  characters: {}
	};
	
	var util = {
	  pathNameSplit: pathNameSplit
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
	
	var ev = new _minivents2.default(); //EventEmitter
	var emit = ev.emit;
	
	/*
	 *
	 */
	
	function pathNameSplit(pathname) {
	  var pathArr = pathname.split('/');
	  var scene = pathArr[0];
	  var label = pathArr[1];
	  return { label: label, scene: scene };
	}
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
	 */
	
	/*
	 * @Функция принимает объект сцены
	 *  {
	 *    characters: {},
	 *    assets: [{}]
	 *    labels: {
	 *         start: [{},{},{},{},{},{},{}],
	 *    }
	 *  }
	 */
	function setScene(sceneName, sceneObject) {
	  try {
	    /*
	     * Назначаем полученные данные сцены в
	     * игровые объекты.
	     * А так же объекты внутреннего назначения
	     */
	    game.scenes[sceneName] = sceneObject;
	    /*
	     * Добавляю персонажей в каждой загруженной сцены
	     * в общий пулл.
	     */
	    game.characters = Object.assign(game.characters, sceneObject.characters);
	    /*
	     * Переопределяю методы текущего label'a
	     */
	    setLabel(ctx.label, sceneObject.labels[ctx.label]);
	
	    emit('setScene', sceneName + ' is defined!');
	    return true;
	  } catch (err) {
	    throw new Error('setScene ', err);
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
	     * Алиас персонажа содержит не больше трех (2)
	     * символов. 
	     */
	    if (key.length <= 2) {
	      var character = game.characters[key];
	
	      var reply = ctx.obj[key];
	      emit('alias', {
	        character: character,
	        reply: reply,
	        aliase: key
	      });
	    } else {
	      /*
	       * vnjs.on('alert')
	       * Подписывает пользовательские плагины
	       * 
	       */
	      ev.emit(key, ctx.obj[key]);
	    }
	  }
	  emit('parse', ctx.obj);
	};
	
	function next() {
	
	  ctx.num += 1;
	  parse();
	  emit('next');
	};
	function prev() {
	
	  ctx.num -= 1;
	  parse();
	  emit('prev');
	};
	
	/*
	 * @api
	 */
	exports.on = on;
	exports.ctx = ctx;
	exports.game = game;
	exports.setScene = setScene;
	exports.setLabel = setLabel;
	exports.option = option;
	exports.plugin = plugin;
	exports.util = util;
	exports.next = next;
	exports.prev = prev;
	exports.parse = parse;
	exports.emit = emit;

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