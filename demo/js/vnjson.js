var vnjs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEBUG = exports.fetch = exports.init = exports.off = exports.emit = exports.parse = exports.prev = exports.next = exports.config = exports.setLabel = exports.setScene = exports.game = exports.ctx = exports.on = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _minivents = __webpack_require__(1);

var _minivents2 = _interopRequireDefault(_minivents);

var _unfetch = __webpack_require__(2);

var _unfetch2 = _interopRequireDefault(_unfetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * development mode
 */
var DEBUG = false;
/*
 * TREE[SCENE_NAME] = SCENE_OBJECT;
 * state
 */
/*
 * 
 * Значение объекта равно состоянию приложения.
 */
/** state **/
var ctx = {
  sceneName: 'scene',
  labelName: 'label',
  scene: {},
  label: [],
  obj: null,
  num: 0,
  screen: '',
  jumps: [],
  data: {
    points: 0
  }
};

var ev = new _minivents2.default(); //EventEmitter
var emit = ev.emit,
    off = ev.off;

//конфигурацию тоже сохранять в memory-card

var config = {};

function init(_config) {
  exports.config = config = _config || config;
  emit('init');
  return this;
};

/**/
var game = {
  scenes: {},
  package: {},
  assets: [],
  settings: {}
};

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

  ev.on(event, handler, vnjs);
  return this;
};

/*
 * setScene
 * @Функция принимает объект сцены
 */
function setScene(sceneName, sceneObject, labelName, num) {
  try {

    /*
     * Назначаем полученные данные сцены в
     * игровые объекты.
     * А так же объекты внутреннего назначения
     */
    game.scenes[sceneName] = sceneObject;
    ctx.scene = sceneObject;
    ctx.sceneName = sceneName;

    /*
     * Переопределяю методы текущего label'a
     */
    sceneObject.assets.forEach(function (item) {
      game.assets.push(item);
    });

    setLabel(labelName, sceneObject[labelName], num);

    emit('load', sceneObject.assets, sceneName);

    return this;
  } catch (err) {
    throw new Error('Ошибка объявления сцены ', err);
    return false;
  }
};

function setLabel(labelName, labelArray, num) {
  ctx.labelName = labelName;
  ctx.label = labelArray;
  ctx.num = num;
  emit('setlabel', labelName, labelArray.length);
  return this;
};

function parse(_obj) {
  /** Текущий объект */
  if (_obj) {
    if ((typeof _obj === 'undefined' ? 'undefined' : _typeof(_obj)) === 'object') {
      /*parse({jump: 'scene/label'})*/
      ctx.obj = _obj;
    } else if (typeof _obj === 'string') {
      /* parse('jump: string/string') */
      /* Убираю пробелы из строки и разбиваю на массив*/
      var data = _obj.replace(/\s/g, "").split(':');

      var ob = _defineProperty({}, data[0], data[1]);
      ctx.obj = ob;
    }
  } else {
    /* parse() without args */
    ctx.obj = ctx.label[ctx.num];
  }

  for (var key in ctx.obj) {
    /*
           * vnjs.on('alert')
           * Подписывает пользовательские плагины
           * 
           */
    /* if(config.debug)
     * ejv.validate(schema, ctx.obj.[key])
     */
    ev.emit(key, ctx.obj[key]);
  }
  emit('parse', ctx.obj);
  return this;;
};

function next() {
  var label = ctx.label,
      num = ctx.num;


  if (num >= label.length) {
    console.log('[end label]');
    ctx.num = 0;
  }
  ctx.num++;
  parse();
  emit('next');
  return ctx.num;
};

on('setlabel', function (labelname, len) {
  var _vnjs$ctx = vnjs.ctx,
      sceneName = _vnjs$ctx.sceneName,
      labelName = _vnjs$ctx.labelName;


  ctx.jumps.push({ sceneName: sceneName, labelName: labelName, len: len });
});
/*
 * Должна показывать предыдущие экраны
 * А так же все движения между метками и сценами
 * 
 */
function prev() {
  var jumps = ctx.jumps,
      label = ctx.label;

  if (label.indexOf(-1)) {
    if (jumps.indexOf(0)) {
      // parse(`screen: ${fn.prevScreen}`)//preloader??
      console.log('Начало игры');
      ctx.num = 0;
      /*fn.prevScreen it should to be array*/
    } else {
      var _jumps$pop = jumps.pop(),
          sceneName = _jumps$pop.sceneName,
          labelName = _jumps$pop.labelName,
          len = _jumps$pop.len;

      var jumpTo = [sceneName, labelName, len].join("/");
      parse('jump: ' + jumpTo);
    }
  } else {
    ctx.num--;
    parse();
  }

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
exports.next = next;
exports.prev = prev;
exports.parse = parse;
exports.emit = emit;
exports.off = off;
exports.init = init;
exports.fetch = _unfetch2.default;
exports.DEBUG = DEBUG;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var index = typeof fetch == 'function' ? fetch.bind() : function (url, options) {
	options = options || {};
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials == 'include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var _keys = [],
			    all = [],
			    headers = {},
			    header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				_keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? header + "," + value : value;
			});

			return {
				ok: (request.status / 200 | 0) == 1, // 200-299
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function text() {
					return Promise.resolve(request.responseText);
				},
				json: function json() {
					return Promise.resolve(request.responseText).then(JSON.parse);
				},
				blob: function blob() {
					return Promise.resolve(new Blob([request.response]));
				},
				headers: {
					keys: function keys() {
						return _keys;
					},
					entries: function entries() {
						return all;
					},
					get: function get(n) {
						return headers[n.toLowerCase()];
					},
					has: function has(n) {
						return n.toLowerCase() in headers;
					}
				}
			};
		}
	});
};

exports.default = index;
//# sourceMappingURL=unfetch.es.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=vnjson.js.map