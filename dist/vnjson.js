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
	exports.jump = exports.config = exports.autorun = exports.parse = exports.getScene = exports.saveGame = exports.loadGame = exports.catalog = exports.game = exports.init = exports.ctx = exports.on = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @deps [ marmottajax, localforge, howler]
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _parse = __webpack_require__(1);
	
	var _parse2 = _interopRequireDefault(_parse);
	
	var _memoryCard = __webpack_require__(2);
	
	var _memoryCard2 = _interopRequireDefault(_memoryCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * init
	 */
	function init(param) {
	
	  game.init = param;
	
	  marmottajax('/game/layers.html').success(function (body) {
	    document.getElementById('game').innerHTML = body;
	
	    jump(game.init.entry);
	  });
	};
	
	/**
	 * Глобальное хранилище вызываемых методов из
	 * пользовательского скрипта
	 * 
	 */
	var catalog = [{
	  event: 'jump',
	  handler: jump
	}];
	/**
	 * @plugins
	 * Регистратор пользовательских событий
	 */
	
	var Event = function () {
	  function Event(event, handler, flag) {
	    _classCallCheck(this, Event);
	
	    this.event = event;
	    this.handler = handler;
	    this.flag = flag;
	  }
	
	  _createClass(Event, [{
	    key: 'add',
	    value: function add() {
	      var _event = {
	        event: this.event,
	        handler: this.handler
	      };
	      catalog.push(_event);
	    }
	  }]);
	
	  return Event;
	}();
	
	;
	/*
	 * @autorun
	 * vnjs.on(function(){});
	 */
	var autorun = [];
	
	function on(event, handler) {
	
	  if (event && handler) {
	    var userEvent = new Event(event, handler);
	    userEvent.add();
	  } else if (event) {
	    autorun.push(event);
	  }
	};
	
	/*
	 * game
	 */
	
	var game = {
	  init: {},
	  scenes: {}
	};
	var config = {
	  audio: true
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
	 * memory card
	 * Набросал грубый вид сохраненок в игре
	 */
	function saveGame(title) {
	  var data = {
	    scene: ctx.scene,
	    label: ctx.label,
	    num: ctx.num,
	    title: title,
	    gameTitle: 'demo'
	  };
	  _memoryCard2.default.save(data);
	};
	function loadGame(title) {
	
	  _memoryCard2.default.load(title);
	}
	
	/**
	 * @TODO Сделать разновидность jump'a
	 * только что бы можно было переходить
	 * на конкретную строку. jumpTo("start/chapter1/14")
	 * А так же разобраться с навигатором. Что б. можно было
	 * скролить новелу назад и вперед.
	 */
	
	function jump(pathname) {
	  /*
	   * Если есть слэш в пути прыжка
	   * то это сцена, значит надо подружать
	   * ресурсы и т.д.
	   */
	  var isScene = /\/\w+/gi.test(pathname);
	
	  if (isScene) {
	
	    var pathArr = pathname.split('/');
	    ctx.num = 0;
	    ctx.scene = pathArr[0];
	    ctx.label = pathArr[1];
	
	    getScene(ctx.scene);
	  }
	  /*
	   * Если слэша нет, то это значит лабел.
	   * поэтому не надо делать лишних телодвижений
	   * а просто выполнить уже загруженный массив
	   */
	  else {
	
	      ctx.num = 0;
	      ctx.label = pathname;
	      ctx.arr = game.scenes[ctx.scene].labels[ctx.label];
	      (0, _parse2.default)(ctx, catalog);
	    };
	};
	
	/*
	 * getScene
	 */
	
	function getScene(scene) {
	
	  var pathToScene = 'game/' + game.init.scenes + '/' + game.init.local + '/' + scene + '.json';
	
	  marmottajax({
	    url: pathToScene,
	    json: true
	  }).success(function (data) {
	    // result
	
	    game.scenes[ctx.scene] = data;
	
	    var _SCENE = game.scenes[ctx.scene];
	
	    ctx.arr = _SCENE.labels[ctx.label];
	    ctx.assets = game.scenes[ctx.scene].assets;
	
	    /** 
	     * Склеиваю персонажей из сцены в каталог
	     *
	     */
	    exports.catalog = catalog = catalog.concat(_SCENE.characters);
	    /**
	      * autorun
	      */
	    autorun.forEach(function (item) {
	      item.call(vnjs);
	    });
	  });
	};
	
	/*
	 * @api
	 */
	exports.on = on;
	exports.ctx = ctx;
	exports.init = init;
	exports.game = game;
	exports.catalog = catalog;
	exports.loadGame = loadGame;
	exports.saveGame = saveGame;
	exports.getScene = getScene;
	exports.parse = _parse2.default;
	exports.autorun = autorun;
	exports.config = config;
	exports.jump = jump;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	 * Модуль отвечающий за смену состояния визуальной новеллы
	 * Отвечает за проход массива [ label ]  
	 * Так же делегирует выполнение параметров текущего объекта
	 * обработчикам [ event ]
	 *
	 */
	/*
	switch(param){
	  case 'prev':
	    this.i--;
	    break;
	  case 'current':
	    this.i = this.i;
	    break;
	  case 'next':
	    this.i++;
	}
	*/
	/*
	 * @plugin
	 * vnjs.alias
	 */
	
	function tokenize(ctx, catalog) {
	  var _loop = function _loop(key) {
	    catalog.forEach(function (item) {
	      /*
	       * Если ключ объекта совподает с зарегистрированным 
	       * алиасом персонажа, то выполняем модуль alias
	       * Т.е. определяем персонаж ли это.
	       */
	      if (item.hasOwnProperty('alias')) {
	        if (item.alias === key) {
	          var reply = ctx.obj[item.alias];
	          vnjs.alias(item, reply);
	        }
	      }
	      /*
	       * Если это функция, то выполняем ее
	       */
	      else if (item.hasOwnProperty('event')) {
	
	          if (item.event === key) {
	            item.handler(ctx.obj[key], key);
	          }
	        }
	        /*
	         * Элемент отсутсвует в реестре событий [catalog]
	         */
	        else {
	            console.log('неизвесный элемент: ' + key);
	          }
	    }); //catalog.forEach
	  };
	
	  /*
	   *  Фильтруем параметры текущего объекта и проверяем наличие их
	   *  реестре событий [ catalog ], если есть совпадения то выполняем их.
	   *
	   */
	  for (var key in ctx.obj) {
	    _loop(key);
	  } //for
	};
	
	function parse(ctx, catalog) {
	  console.log(ctx.scene + '/' + ctx.label + '/' + ctx.num);
	  /** Текущий объект */
	  ctx.obj = ctx.arr[ctx.num];
	
	  tokenize(ctx, catalog);
	  ctx.num += 1;
	}
	
	exports.default = parse;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.save = save;
	exports.load = load;
	/*
	 * Так же потом сделать удаленные сохраненки на
	 * vnjson.online
	 */
	
	function save(data) {
	  localforage.setItem(data.title, data, function (err) {
	    if (err) {
	      console.log(err);
	    }
	    console.log('Игра сохранена');
	  });
	};
	
	function load(key) {
	  localforage.getItem(key).then(function (data) {
	    console.log(data);
	  }).catch(function (err) {
	    console.error(err);
	  });
	}
	
	exports.default = {
	  save: save, load: load
	};

/***/ }
/******/ ]);
//# sourceMappingURL=vnjson.js.map