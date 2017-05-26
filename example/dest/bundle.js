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

vnjs.getScene = function (sceneName, labelName) {
      var _vnjs = vnjs;
      var ctx = _vnjs.ctx;
      var setScene = _vnjs.setScene;
      var get = _vnjs.get;
      var emit = _vnjs.emit;
      var config = _vnjs.config;

      emit('preload');
      qwest.get(config.scenesDir + sceneName + ".json", { responseType: 'json' }).then(function (req, res) {
            ctx.label = labelName;
            setScene(sceneName, res);
      });
};
'use strict';

/*
 * @ deps getScene
 */
vnjs.on('jump', function (pathname) {
  var ctx = this.ctx;
  var next = this.next;
  var setScene = this.setScene;
  var setLabel = this.setLabel;
  var util = this.util;
  var game = this.game;
  var parse = this.parse;
  var getScene = this.getScene;
  var emit = this.emit;


  var isScene = /\/\w+/gi.test(pathname);
  if (isScene) {
    var obj = util.splitPathName(pathname);
    console.log(pathname);
    ctx.num = 0;
    getScene(obj.scene, obj.label);
  } else {

    ctx.num = 0;
    setLabel(pathname, ctx.scene.labels[pathname]);

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
