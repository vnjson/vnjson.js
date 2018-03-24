var vnjs = {
  plugins: {},
  TREE: {},
  DEBUG: false,
  playList: {},
  prevAudio: "",
  prevScreen: "",
  screenList: {}
};
vnjs.conf = {
  prefix: '',
  element: '.gameElement',
  gameDir: './game',
  scenesDir: "scenes",
  local: 'en-US',
  entryPoint: 'entry/point',
  screenClass: '.screen'
};

vnjs.on = function (event, handler) {
  if (!vnjs.plugins[event]) {
    vnjs.plugins[event] = [];
  }

  ;
  vnjs.plugins[event].push(handler);
};

vnjs.emit = function (event) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (Array.isArray(vnjs.plugins[event])) {
    vnjs.plugins[event].map(function (handler) {
      handler.call.apply(handler, [vnjs].concat(args));
    });
  }
  /*
  else{
   Выводятся системные слушатели
   console.log(`Event [ ${event} ] not found`)
  }
  */

};

vnjs.off = function (event) {
  delete vnjs.plugins[event];
};
/*
 * В {state} должно помещаться все то
 * что сохроняется в карту памяти
 * И что важно загрузить из нее без последствий.
 * В состоянии не должно быть мусора
 */


vnjs.state = {
  scene: 'scene',
  label: 'label',
  index: 0,
  screen: "",
  //current screen
  data: {} //userData

};
/*
 * Получает текущее тела из состояние
 */

vnjs.current = {
  scene: function scene() {
    return vnjs.TREE[vnjs.state.scene];
  },
  label: function label() {
    return vnjs.TREE[vnjs.state.scene][vnjs.state.label];
  },
  object: function object() {
    return vnjs.TREE[vnjs.state.scene][vnjs.state.label][vnjs.state.index];
  },
  screen: function screen() {
    //> DOM<
    return document.getElementById("".concat(vnjs.conf.prefix).concat(vnjs.state.screen));
  } //character

};

vnjs.setScene = function (name, body) {
  this.TREE[name] = body;
  this.state.scene = name;

  if ("characters" in body) {
    body.characters.map(function (character) {
      var aliase = Object.keys(character)[0];
      vnjs.on(aliase, function (reply) {
        var obj = {
          aliase: aliase,
          param: character[aliase],
          reply: reply
        };
        vnjs.emit('character', obj);

        vnjs.current.character = function () {
          return obj;
        };
      });
    }); //.map
  }

  ;

  if ("assets" in body) {
    this.emit('load', body.assets);
  } else {
    emit('postload');
  }
};

vnjs.parse = function (obj) {
  var ctx = null;

  if (obj) {
    ctx = obj;
  } else {
    ctx = vnjs.current.object();
  }

  ;

  for (var event in ctx) {
    vnjs.emit(event, ctx[event]);
  }

  ;
  this.emit('parse', ctx);
};

vnjs.next = function () {
  this.state.index++;
  this.parse();
};

vnjs.getScreens = function () {
  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var conf = this.conf,
      DEBUG = this.DEBUG,
      emit = this.emit;

  function fetchCss(filename) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = filename;
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(l);
  }

  ;
  var uriHtml = "".concat(conf.gameDir, "/screens.html");
  var uriCss = "".concat(conf.gameDir, "/screens.css");
  var gameRoot = document.querySelector(conf.element);
  fetch(uriHtml).then(function (r) {
    return r.text();
  }).then(function (screens) {
    fetchCss(uriCss);
    gameRoot.innerHTML = screens;
  }).then(function () {
    var screensNodeList = document.querySelectorAll(conf.screenClass);
    screensNodeList.forEach(function (screen) {
      var styles = {
        display: 'none',
        width: '100%',
        height: '100%'
      };
      Object.assign(screen.style, styles);
      /*Код кантораЮ необходимо для работы 'Правильлного show/hide'*/

      screen.setAttribute("displayOld", screen.style.display);
      vnjs.screenList[screen.id] = screen;
    });
    callback();
  }).catch(function (error) {
    return console.error(error);
  });
};

vnjs.init = function (conf) {
  var _this = this;

  Object.assign(vnjs.conf, conf);
  this.getScreens(null, function () {
    _this.parse({
      jump: conf.entryPoint
    });

    _this.emit('init');
  });
  return true;
};

vnjs.log = {
  error: function error(msg) {
    console.log("%c Error %c ".concat(msg), "color: white; background: red; font-size:12px;", "color: red; font-size:12px;");
  },

  /*
  scene: (scene, label)=>{
    console.log(`%c ${scene} %c ${label}`, "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },*/
  event: function event(e) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    console.log("%c ".concat(e, " %c ").concat(msg, " "), "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  //#A0BACB
  index: function index(_) {
    console.log("%c vnjson.js %c v0.9.3", "color: #C9DAE4; background: #A0BACB; font-size:12px;", "background: #C9DAE4; color: #A0BACB; font-size:12px;");
  },
  info: function info(data) {
    console.log("%c ".concat(data), "color: #A0BACB; background: #ffffff; font-size:12px;");
  }
};
vnjs.log.index();
/*   filter: blur(5px);
 -webkit-filter: blur(5px);*/
vnjs.on('blur', function (data) {
  var target = data.target,
      size = data.size,
      duration = data.duration;
  var elem = document.querySelector("." + target);
  Object.assign(elem.style, {
    'filter': "blur(".concat(size, "px)"),
    '-webkit-filter': "blur(".concat(size, "px)"),
    'transition': "".concat(duration, "s filter linear"),
    '-webkit-transition': "".concat(duration, "s  -webkit-filter linear")
  });
});
vnjs.on('contrast', function (data) {
  var target = data.target,
      size = data.size,
      duration = data.duration;

  try {
    var elem = document.querySelector("." + target);
    Object.assign(elem.style, {
      'filter': "contrast(".concat(size, ")"),
      '-webkit-filter': "contrast(".concat(size, ")"),
      'transition': "".concat(duration, "s filter linear"),
      '-webkit-transition': "".concat(duration, "s  -webkit-filter linear")
    });
  } catch (e) {
    console.error("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 [ ".concat(target, " ] \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D "), e);
  }
});
vnjs.on('grayscale', function (data) {
  var target = data.target,
      size = data.size,
      duration = data.duration;
  var elem = document.querySelector("." + target);

  try {
    Object.assign(elem.style, {
      'filter': "grayscale(".concat(size, ")"),
      '-webkit-filter': "grayscale(".concat(size, ")"),
      'transition': "".concat(duration, "s filter linear"),
      '-webkit-transition': "".concat(duration, "s  -webkit-filter linear")
    });
  } catch (e) {
    console.error("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 [ ".concat(target, " ] \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D "), e);
  }
});
vnjs.on('jump', function (pathname) {
  var parse = this.parse,
      emit = this.emit,
      DEBUG = this.DEBUG,
      conf = this.conf,
      setScene = this.setScene;

  function getScene(sceneName, labelName) {
    var uri = "".concat(conf.gameDir, "/").concat(conf.scenesDir, "/").concat(conf.local, "/").concat(sceneName, ".json");
    emit('preload', {
      sceneName: sceneName,
      labelName: labelName
    });
    fetch(uri).then(function (r) {
      return r.json();
    }).then(function (sceneBody) {
      vnjs.setScene(sceneName, sceneBody);
    });
    /*
    
    setScene("*", sceneBody);
    
    state.label = "mainMenu";
    
    next();
    */
  }

  function isScene(pathName) {
    var arr = pathName.split('/');
    /*
        scene/label/index
    */

    if (arr.length === 3) {
      if (isNaN(+arr[2])) {
        console.warn('scene/label/index');
        console.warn('Index should be a Number');
        vnjs.state.index = 0;
      }

      return true;
    }
    /*
        scene/label
    */
    else if (arr.length === 2) {
        var isLabel = false;
        /*  scene/label  */

        if (isNaN(+arr[1])) {
          isLabel = true;
        }
        /*  label/index  */
        else {
            isLabel = false;
          }

        return isLabel;
      }
  }

  ;
  var arr = pathname.split('/');

  if (isScene(pathname)) {
    // set state
    vnjs.state.scene = arr[0];
    vnjs.state.label = arr[1];
    vnjs.state.index = arr[2] || 0;
    getScene(vnjs.state.scene, vnjs.state.label);
  } else {
    // set state
    // vnjs.state.scene = vnjs.state.scene;
    vnjs.state.label = arr[0];
    vnjs.state.index = arr[1] || 0;
    parse();
  }
});
vnjs.progressSave = function () {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var conf = this.conf;
  var serialState = JSON.stringify(this.state);
  localStorage.setItem(conf.prefix + id, serialState);
  this.emit('progressSave', {
    id: id
  });
};

vnjs.progressLoad = function () {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var conf = this.conf;
  var _state = this.state,
      screen = _state.screen,
      scene = _state.scene,
      label = _state.label,
      index = _state.index;
  vnjs.state = JSON.parse(localStorage.getItem(conf.prefix + id));
  this.emit('progressLoad', {
    id: id
  });
  this.parse({
    screen: screen
  });
  this.parse({
    jump: [scene, label, index].join('/')
  });
};

vnjs.progressDelete = function (id) {
  var conf = this.conf;
  delete localStorage[conf.prefix + id];
  this.emit('progressDelete', {
    id: id
  });
};
/**



Плагины
get-screens
 &
screen-show
объеденить в один ->screen

* Так же можно было бы объеденить jump и getScenes
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
      var testElem = document.createElement(nodeName);
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
}

vnjs.on('screen', function (id) {
  this.emit(id, vnjs.screenList[id]);

  if (vnjs.prevScreen != "") {
    var pscreen = vnjs.screenList[vnjs.prevScreen];
    hide(pscreen);
  }

  vnjs.prevScreen = id; //prefix
  //show.id
  //hide.pref.screen
  //push.state.screens

  vnjs.state.screen = id;
  show(vnjs.screenList[id]);
});
vnjs.on('left', function (data) {
  var el = document.querySelector('.left');
  el.style.backgroundImage = "url(game/assets/".concat(data, ".png)"); //el.styl

  show(el);
});
vnjs.on('center', function (data) {
  var el = document.querySelector('.center');
  el.style.backgroundImage = "url(/game/assets/".concat(data, ".png)");
  show(el);
});
vnjs.on('right', function (data) {
  var el = document.querySelector('.right');
  el.style.backgroundImage = "url(/game/assets/".concat(data, ".png)");
  show(el);
});
function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

vnjs.on('swing', function () {
  var el = document.querySelector('.dialog-box');
  addClass(el, 'swing');
  setTimeout(function () {
    removeClass(el, 'swing');
  }, 1000);
});
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

vnjs.on('audio', function (data) {
  if (typeof data === 'string') {
    if (vnjs.prevAudio != "") {
      vnjs.playList[vnjs.prevAudio].pause();
    }

    vnjs.playList[data].play();
    vnjs.prevAudio = data;
  } else if (_typeof(data) === 'object') {
    if (vnjs.prevAudio != "") {
      vnjs.playList[vnjs.prevAudio].pause();
    }

    vnjs.playList[data.id][data.action]();
    vnjs.prevAudio = data.id; // vnjs.audio[data.id].loop = data.loop;
  } else {
    console.error('incorect data type');
  } //var sound = self.playlist[self.index].howl;

});
/* @events
    * preload
    * load
    * postload
 */
vnjs.on('load', function (assets) {
  var DEBUG = this.DEBUG,
      emit = this.emit;
  var persent = 100 / assets.length;
  var PROGREESS = 0;
  var i = 0;

  var _loop = function _loop(asset) {
    position = [i += 1, '/', assets.length].join("");
    var progress = Math.round(PROGREESS += persent) + "%";

    if (asset.type === "image") {
      var img = new Image();
      img.src = asset.path;

      img.onload = function () {
        emit('imageLoad', asset);
      };
    } else if (asset.type === "audio") {
      var audio = new Audio();
      audio.addEventListener('canplaythrough', function () {
        emit('audioLoad', asset);
      }, false);
      audio.src = asset.path;
      vnjs.playList[asset.id] = audio;
    } else {
      console.error('Incorect asset type');
      return "break";
    }

    var data = Object.assign(asset, {
      progress: progress,
      position: position
    });
    emit('asset', data);
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = assets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var asset = _step.value;
      var position;

      var _ret = _loop(asset);

      if (_ret === "break") break;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  emit('postload');
});
//# sourceMappingURL=vnjson.js.map
