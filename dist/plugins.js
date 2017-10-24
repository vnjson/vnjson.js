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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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

  function getScene(sceneName, labelName, num) {
    var scenesDir = config.scenesDir;

    fetch(scenesDir + '/' + sceneName + '.json').then(function (r) {
      return r.json();
    }).then(function (data) {
      setScene(sceneName, data, labelName, num);
    });
  }

  if (isScene(pathname)) {
    emit('preload');
    getScene(obj.scene, obj.label, obj.num);
  } else {
    emit('changelabel');
    setLabel(pathname, ctx.scene[pathname], obj.num);
  }
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


var audio1 = document.createElement('audio');
audio1.id = "audio-1";
document.body.appendChild(audio1);

var audioPlayer1 = document.getElementById('audio-1');

function playAudio1(src) {
  audioPlayer1.src = src;
  audioPlayer1.play();
}

/*
 * @audio
 */

vnjs.on('audio', function (id) {

  vnjs.game.assets.forEach(function (item) {
    if (item.type === "audio" && item.id === id) {
      playAudio1(item.path);
    }
  });
});
/*
 * @sound
 */
var sound1 = document.createElement('audio');
sound1.id = "sound-1";
document.body.appendChild(sound1);

var soundPlayer1 = document.getElementById('sound-1');
function playSound1(src) {
  soundPlayer1.src = src;
  soundPlayer1.play();
}
vnjs.on('sound', function (id) {

  vnjs.game.assets.forEach(function (item) {
    if (item.type === "audio" && item.id === id) {
      playSound1(item.path);
    }
  });
});

/*
if(vnjs.ctx.audio!==undefined){
  this.audio[vnjs.ctx.audio].stop();

}*/

/*
if(typeof e==="object"){
 //console.log( this.audio[e.id].state() )
  this.audio[e.id].loop(e.loop);
  this.audio[e.id].volume(e.volume);
  this.audio[e.id].play();
  vnjs.ctx.audio = e.id;
  console.log(e)
}else if(typeof e==="string"){

  this.audio[e].play();
  vnjs.ctx.audio = e;
}

*/

/***/ })

/******/ });