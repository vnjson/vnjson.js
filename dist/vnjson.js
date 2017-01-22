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
	exports.current = exports.on = undefined;
	
	var _init = __webpack_require__(1);
	
	var _init2 = _interopRequireDefault(_init);
	
	var _Event = __webpack_require__(8);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _current = __webpack_require__(6);
	
	var _current2 = _interopRequireDefault(_current);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function on(event, handler, flag) {
		if (event && handler) {
			new _Event2.default(event, handler, flag);
		} else {
			(0, _init2.default)();
		};
	};
	
	exports.on = on;
	exports.current = _current2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _autorun = __webpack_require__(3);
	
	var _autorun2 = _interopRequireDefault(_autorun);
	
	var _jump = __webpack_require__(5);
	
	var _jump2 = _interopRequireDefault(_jump);
	
	var _ajax = __webpack_require__(7);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init() {
	
			(0, _ajax2.default)('./game/init.json', function (data) {
					/**
	     * @start autorun
	     */
	
					(0, _autorun2.default)();
					/**
	    	 * @game[init.json]
	     */
					_game2.default.init = data;
					/*
	     * @jump to start Label
	     */
	
					(0, _jump2.default)(data.config.startLabel);
			});
	};
	exports.default = init;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	var game = {
			init: {},
			scenes: {}
	};
	
	exports.default = game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _catalog = __webpack_require__(4);
	
	var _catalog2 = _interopRequireDefault(_catalog);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function autorun() {
		/*catalog.map((obj)=>{
	 	if(obj.hasOwnProperty('autorun')){
	 		if(obj.autorun===true){
	 			
	 			obj.handler(obj.event);
	 		}
	 	}
	 	
	 });*/
	};
	
	exports.default = autorun;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	
	var _jump = __webpack_require__(5);
	
	var _jump2 = _interopRequireDefault(_jump);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
			jump: _jump2.default
	
	};
	
	
	new Event('scene', function (data) {
			console.log('scene: ' + data);
	});
	
	new Event('left', function (data) {
			console.log('left: ' + data);
	});
	
	new Event('right', function (data) {
			console.log('right: ' + data);
	});
	
	new Event('center', function (data) {
			console.log('center: ' + data);
	});
	
	new Event('audio', function (data) {
			console.log('audio: ' + data);
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _current = __webpack_require__(6);
	
	var _current2 = _interopRequireDefault(_current);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import getScene from './get-scene';
	exports.default = function (pathname) {
		/**
	 	не работает потому что первый прыжок
	 	загружает саму сцену, а второй только по
	 	label'ам прыгает.
	 */
		_current2.default.pathname = pathname;
		var pathArr = pathname.split('/');
		_current2.default.scene = pathArr[0];
		_current2.default.label = pathArr[1];
		//getScene(current.scene);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var current = {
		pathname: 'scene/label',
		scene: 'scene',
		label: 'label',
		obj: null,
		num: 0
	};
	
	exports.default = current;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @Simple ajax function
	 */
	function ajax(pathToScene, callback) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function () {
	    if (this.readyState == 4 && this.status == 200) {
	      callback(JSON.parse(this.responseText));
	    }
	  };
	  xhttp.open("GET", pathToScene, true);
	  xhttp.send();
	};
	
	exports.default = ajax;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _catalog = __webpack_require__(4);
	
	var _catalog2 = _interopRequireDefault(_catalog);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Event = function () {
		function Event(event, handler, flag) {
			_classCallCheck(this, Event);
	
			this.event = event;
			this.handler = handler;
			this.flag = flag;
			this.pushToCatalog();
		}
	
		_createClass(Event, [{
			key: 'pushToCatalog',
			value: function pushToCatalog() {
				var _event = {
					event: this.event,
					handler: this.handler,
					autorun: this.flag
				};
				Object.assign(_catalog2.default, _event);
			}
		}]);
	
		return Event;
	}();
	
	exports.default = Event;

/***/ }
/******/ ]);
//# sourceMappingURL=vnjson.js.map