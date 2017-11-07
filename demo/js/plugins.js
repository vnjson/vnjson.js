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


/* @events
    * preload
    * load
    * postload
 */

vnjs.on('load', function (assets) {
    var emit = this.emit;

    var persent = 100 / assets.length;
    var progress = 0;

    var _loop = function _loop(i) {
        position = 1 + i + "/" + assets.length;

        progress += persent;

        emit('asset', Object.assign(assets[i], { position: position, progress: Math.round(progress) + "%" }));
        if (assets[i].type === "image") {
            img = new Image();

            img.src = assets[i].path;
            img.onload = function () {
                return emit('img:loaded', assets[i]);
            };
        } else if (assets[i].type === "audio") {
            audio = new Audio();

            audio.addEventListener('canplaythrough', function () {
                emit('audio:loaded', assets[i]);
            }, false);
            audio.src = assets[i].path;
        };
    };

    for (var i = 0; i <= assets.length - 1; i++) {
        var position;
        var img;
        var audio;

        _loop(i);
    };

    emit.call(this, 'postload');
});

/***/ })
/******/ ]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


vnjs.on('jump', function (pathname) {
  var ctx = this.ctx,
      next = this.next,
      setScene = this.setScene,
      setLabel = this.setLabel,
      config = this.config,
      game = this.game,
      parse = this.parse,
      emit = this.emit,
      fetch = this.fetch;


  function isNum(num) {
    return (/[0-9]/.test(+num)
    );
  };
  function isScene(pathname) {
    var arr = pathname.split('/');
    if (arr.length === 3) {
      return true;
    } else if (arr.length === 2) {

      return !isNum(arr[1]);
    }
  };

  function getName(pathname) {
    /*
      Сделать проверку num
      что бы можно было сделать так
      jump(scene/label/44)
    */
    var pathArr = pathname.split('/');

    var scene = pathArr[0];
    var label = pathArr[1];
    var num = pathArr[2] || 0;
    return { label: label, scene: scene, num: num };
  };

  var obj = getName(pathname);

  if (isScene(pathname)) {
    emit('preload');
    emit('get-scene', obj.scene, obj.label, obj.num);
  } else {
    emit('changelabel');
    setLabel(pathname, ctx.scene[pathname], obj.num);
  }
});

/***/ })

/******/ });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


vnjs.on('init', function () {
  var _vnjs = vnjs,
      emit = _vnjs.emit,
      fetch = _vnjs.fetch,
      DEBUG = _vnjs.DEBUG;
  var _vnjs$config = vnjs.config,
      gameDir = _vnjs$config.gameDir,
      screensPath = _vnjs$config.screensPath,
      gameElem = _vnjs$config.gameElem,
      prefix = _vnjs$config.prefix;


  var screenClass = ".screen";
  var gameNode = document.querySelector(gameElem);
  var uri = [gameDir, screensPath].join("");

  fetch(uri).then(function (r) {
    return r.text();
  }).then(function (html) {

    gameNode.innerHTML = html;
  }).then(function () {
    var SCREENS = document.querySelectorAll(screenClass);
    SCREENS.forEach(function (screen) {

      var styles = {
        display: 'none',
        width: '100%',
        height: '100%'
      };
      Object.assign(screen.style, styles);
      DEBUG && console.log(screen);
    });
    emit('screensloaded');
  });
});

/***/ })
/******/ ]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _showHide = __webpack_require__(4);

vnjs.on('screen', function (id) {
  var prefix = vnjs.config.prefix;


  vnjs.ctx.prevScreens = vnjs.ctx.prevScreens || [];
  var prevScreens = vnjs.ctx.prevScreens;


  if (!prevScreens.length <= 0) {
    var prevScreen = vnjs.ctx.prevScreens[prevScreens.length - 1];
    (0, _showHide.hide)(document.querySelector(prevScreen));
  }

  var _id = ['#', prefix, id].join("");

  vnjs.ctx.prevScreens.push(_id);
  (0, _showHide.show)(document.querySelector(_id));
  vnjs.ctx.screen = _id;
  vnjs.emit(id, document.querySelector(_id));
}); /*
     * [bug] Когда хочу получить ctx.screen, то
     * в on('menu') там лежит #preloader
     */

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Этот код взят с отсюда
 * https://javascript.ru/ui/show-hide-toggle
 *
 */

function getRealDisplay(elem) {
  if (elem.currentStyle) {
    return elem.currentStyle.display;
  } else if (window.getComputedStyle) {
    var computedStyle = window.getComputedStyle(elem, null);

    return computedStyle.getPropertyValue('display');
  }
}

function hide(el) {
  if (!el.getAttribute('displayOld')) {
    el.setAttribute("displayOld", el.style.display);
  }

  el.style.display = "none";
}

displayCache = {};

function isHidden(el) {
  var width = el.offsetWidth,
      height = el.offsetHeight,
      tr = el.nodeName.toLowerCase() === "tr";

  return width === 0 && height === 0 && !tr ? true : width > 0 && height > 0 && !tr ? false : getRealDisplay(el);
}

function toggle(el) {
  isHidden(el) ? show(el) : hide(el);
}

function show(el) {

  if (getRealDisplay(el) != 'none') return;

  var old = el.getAttribute("displayOld");
  el.style.display = old || "";

  if (getRealDisplay(el) === "none") {
    var nodeName = el.nodeName,
        body = document.body,
        display;

    if (displayCache[nodeName]) {
      display = displayCache[nodeName];
    } else {
      var testElem = window.document.createElement(nodeName);
      body.appendChild(testElem);
      display = getRealDisplay(testElem);

      if (display === "none") {
        display = "block";
      }

      body.removeChild(testElem);
      displayCache[nodeName] = display;
    }

    el.setAttribute('displayOld', display);
    el.style.display = display;
  }
};

exports.show = show;
exports.hide = hide;

/***/ })
/******/ ]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Fetch json scene
 * @event {on}         getscene - emmiter  vnjson-jump
 * @event {emit}       preload - listener vnjson-preload
 * @param {string}     sceneName  - 
 * @param {string}     labelName - Scene object method name
 * @param {number}     num - index current array
 */

vnjs.on('getscene', function (sceneName, labelName, num) {
  var _config = config,
      scenesDir = _config.scenesDir,
      local = _config.local;

  fetch(scenesDir + '/' + local + '/' + sceneName + '.json').then(function (r) {
    return r.json();
  }).then(function (data) {
    setScene(sceneName, data, labelName, num);
  });
});

/***/ })

/******/ });