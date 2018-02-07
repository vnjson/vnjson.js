var vnjs = {
  plugins: {},
  TREE: {},
  DEBUG: false
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
  } else {
    console.log("Event [ ".concat(event, " ] not found"));
  }
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
  index: 0
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
  }
};

vnjs.setScene = function (name, body) {
  this.TREE[name] = body;
  this.state.scene = name;
  body.characters.map(function (character) {
    var aliase = Object.keys(character)[0];
    vnjs.on(aliase, function (reply) {
      vnjs.emit('character', {
        aliase: aliase,
        param: character[aliase],
        reply: reply
      });
    });
  });
  this.parse();
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
};

vnjs.next = function () {
  this.parse();
  this.state.index++;
  return '-------------------------';
};

vnjs.init = function (conf) {
  vnjs.conf = conf;
  this.parse({
    'jump': conf.entryScene
  });
  return true;
};
/**
 conf = /scenes/
*/
vnjs.on('getScene', function (data) {
  var sceneName = data.sceneName,
      labelName = data.labelName,
      index = data.index;
  var DEBUG = this.DEBUG,
      conf = this.conf;
  var uri = "".concat(conf.gameDir, "/").concat(conf.scenesDir, "/").concat(conf.local, "/").concat(sceneName, ".json");
  fetch(uri).then(function (r) {
    return r.json();
  }).then(function (sceneBody) {
    if (DEBUG) {
      console.log(sceneName, sceneBody);
      console.log(data);
    }

    vnjs.setScene(sceneName, sceneBody, labelName, index);
  });
  /*
  
  setScene("*", sceneBody);
  
  state.label = "mainMenu";
  
  next();
  */
});
vnjs.on('jump', function (pathname) {
  var parse = this.parse,
      state = this.state,
      emit = this.emit,
      DEBUG = this.DEBUG;
  var pathArr = pathname.split('/');
  /*****
  #WARN
  > {jump: 'label/0'}
  < Object { labelName: "0", sceneName: "label", index: 0 }
  
  ******/

  function getName() {
    var sceneName = pathArr[0];
    var labelName = pathArr[1];
    var index = pathArr[2] || 0;
    return {
      labelName: labelName,
      sceneName: sceneName,
      index: +index
    };
  }

  ;

  function isNum(num) {
    return /[0-9]/.test(+num);
  }

  ;

  function isScene(pathname) {
    if (pathArr.length === 3) {
      return true;
    } else if (pathArr.length === 2) {
      return !isNum(pathArr[1]);
    }
  }

  ;
  var pathObj = getName(pathname);
  {
    DEBUG && console.log('jump: ', pathObj);
  }
  ;

  if (isScene(pathname)) {
    // set state
    vnjs.state.scene = pathObj.sceneName;
    vnjs.state.label = pathObj.labelName;
    vnjs.state.index = pathObj.index;
    emit('getScene', pathObj);
  } else {
    var pathArr1 = pathname.split('/'); // set state

    vnjs.state.scene = vnjs.state.scene;
    vnjs.state.label = pathArr1[1];
    vnjs.state.index = pathObj.index; // setLabel(pathname, ctx.scene[pathname],  obj.num );

    parse();
  }
  /*
  state.index = 0;
  state.label = "chapter1";
  state.scene = "scene2";
  parse();*/

});
//# sourceMappingURL=vnjson.js.map
