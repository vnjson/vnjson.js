'use strict';

vnjs.on('main-menu', function () {
  this.parse({ alert: 'kasin++' });
  document.getElementById('start-game').addEventListener('mousedown', function (e) {
    e.preventDefault();
    vnjs.parse({ 'jump': 'chapter1' });
    vnjs.next();
  });
});
"use strict";

vnjs.on('alias', function (obj) {

  console.log(obj.character.name + ": " + obj.reply);
});
'use strict';

vnjs.on('getscene', function (obj) {
  var ctx = this.ctx;
  var setScene = this.setScene;
  var setLabel = this.setLabel;
  var emit = this.emit;
  var config = this.config;

  emit('preload');
  qwest.get(config.scenesDir + obj.sceneName + ".json", { responseType: 'json' }).then(function (req, res) {
    setLabel(obj.labelName, []);
    setScene(sceneName, res);
  });
});
'use strict';

vnjs.on('jump', function (pathname) {
  var ctx = this.ctx;
  var next = this.next;
  var setScene = this.setScene;
  var setLabel = this.setLabel;
  var game = this.game;
  var parse = this.parse;
  var getScene = this.getScene;
  var emit = this.emit;

  var isScene = /\/\w+/gi.test(pathname);

  function getName(pathname) {
    var pathArr = pathname.split('/');
    var scene = pathArr[0];
    var label = pathArr[1];
    return { label: label, scene: scene };
  };

  if (isScene) {
    var obj = getName(pathname);
    ctx.num = 0;
    emit('getscene', { labelName: obj.label, sceneName: obj.scene });
  } else {
    ctx.num = 0;
    setLabel(pathname, ctx.scene[pathname]);
    parse();
  }
});
"use strict";

vnjs.on('preload', function () {
  this.parse({
    "screen": "preloader"
  });
});
vnjs.on('setscene', function () {
  var emit = this.emit;
  var game = this.game;
  var ctx = this.ctx;


  ctx.scene.assets.forEach(function (item) {
    console.info(item);
  });
  emit('load');
});

vnjs.on('load', function () {
  setTimeout(function () {
    document.getElementById('vnjson__preloader').style.display = "none";
  }, 3000);
});
'use strict';

vnjs.on('init', function () {
  var config = this.config;
  var parse = this.parse;
  var emit = this.emit;

  qwest.get(config.screensPath, { responseType: 'html' }).then(function (body) {
    document.querySelector(config.el).innerHTML = body.response;

    parse({ jump: config.startLabel });
  }).catch(function (err) {
    console.error(err);
  });
});

vnjs.screens = [];
vnjs.on('screen', function (id) {
  var config = this.config;
  var parse = this.parse;
  var emit = this.emit;

  this.screens.push(id);

  if (this.screens.length >= 2) {
    var prev = this.screens[this.screens.length - 2];

    var prevScreen = document.getElementById(config.screensPrefix + prev);
    prevScreen.style.display = "none";
  }
  var screen = document.getElementById(config.screensPrefix + id);
  screen.style.display = "block";
  emit(id, { id: id });
});
//# sourceMappingURL=bundle.js.map
