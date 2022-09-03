var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var knot = function knot() {
  var extended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var events = Object.create(null);

  function on(name, handler) {
    events[name] = events[name] || [];
    events[name].push(handler);
    return this;
  }

  function once(name, handler) {
    handler._once = true;
    on(name, handler);
    return this;
  }

  function off(name) {
    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    handler ? events[name].splice(events[name].indexOf(handler), 1) : delete events[name];
    return this;
  }

  function emit(name) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    } // cache the events, to avoid consequences of mutation


    var cache = events[name] && events[name].slice(); // only fire handlers if they exist

    cache && cache.forEach(function (handler) {
      // remove handlers added with 'once'
      handler._once && off(name, handler); // set 'this' context, pass args to handlers

      handler.apply(_this, args);
    });
    return this;
  }

  return _extends({}, extended, {
    on: on,
    once: once,
    off: off,
    emit: emit,
    events: events
  });
};

const emitter = knot();

class Vnjson {
  version = "2.0.1";
  ctx = null;
  tree = null;
  package = null;
  debug = false;
  conf = null;
  events = emitter.events;
  plugins = {};
  store = {};
  state = {
    index: 0,
    labelName: "",
    sceneName: "",
    character: null,
    data: {
      score: null
    },
    tree: [],
    assets: []
  };
  on = emitter.on;
  once = emitter.once;
  emit = emitter.emit;
  off = emitter.off;

  constructor() {}

  getAssetByName(name) {
    const asset = this.state.assets.find(asset => {
      return asset.name === name;
    });

    if (asset) {
      return asset;
    } else {
      this.emit("error", "assetNotFound", name);
      return {
        url: name
      };
    }
  }

  getDataByName(id) {
    const scenesBody = Object.values(this.tree);
    let data = null;
    scenesBody.forEach(body => {
      if (body.data) {
        if (body.data.hasOwnProperty(id)) {
          data = {
            id,
            body: decodeURI(atob(body.data[id]))
          };
        }
      }
    });
    return data;
  }

  isSceneExist(sceneName) {
    if (this.tree[sceneName]) {
      return true;
    }

    return false;
  }

  isLabelExist(sceneName, labelName) {
    if (this.isSceneExist(sceneName) && this.tree[sceneName][labelName]) {
      return true;
    }

    return false;
  }

  isRouteExist(pathname) {
    const route = pathname.split(".");

    if (route.length === 1) {
      return this.isSceneExist(this.state.sceneName, route[0]);
    }

    if (route.length > 1) {
      return this.isLabelExist(route[0], route[1]);
    }
  }

  getCurrentLabelBody() {
    try {
      const labelBody = this.tree[this.state.sceneName][this.state.labelName];
      return labelBody;
    } catch (err) {
      this.emit("error", "menuOrJumpLeadsNowhere");
      return [""];
    }
  }

  getCurrentCharacter() {
    return this.state.character;
  }

  getCharacterById(id) {
    return this.tree.$root.characters.find(character => character.id === id);
  }

  getCharacters() {
    return this.tree.$root.characters;
  }

  getCtx() {
    return this.getCurrentLabelBody()[this.state.index];
  }

  mount(tree) {
    this.tree = tree;
    this.package = this.tree.$root.package;

    if (!this.tree.$root.hasOwnProperty("characters")) {
      const narrator = {
        id: "$",
        name: ". . . .",
        nameColor: "#49de58",
        replyColor: "#a4deaa"
      };

      if (this.conf.$) {
        narrator = this.conf.$;
      }

      this.tree.$root.characters = [narrator];
    }

    this.tree.$root.characters.map(character => {
      /**
       * Навешиваем слушатель на id персонажа
       *
       */
      this.on(character.id, reply => {
        this.state.character = character;
        this.emit("vnjson.character", character, reply);
      });
    });
    this.emit("vnjson.mount");
  }

  exec(ctx) {
    //Получаем текущий объект контекста
    this.ctx = ctx || this.getCtx();

    if (typeof this.ctx === "string") {
      this.emit("$", this.ctx);
      this.emit("exec", this.ctx);
    } // $: null | $: false
    else if (!this.ctx) {
      this.emit("$", String(this.ctx));
      this.emit("exec", String(this.ctx));
    } else if (typeof this.ctx === "object") {
      /**
       * Преобразуем объект контекста [this.ctx] в массив
       * [ ['key', 'value'], ['key2','value2']]
       * Пробегаемся по этому массиву, и записываем
       * ключ-значение в переменные [ event, data ]
       */
      for (let [event, data] of Object.entries(this.ctx)) {
        /**
         * Вызываем плагины с соответсвующими именами ключей
         */
        if (!/^_/i.test(event)) {
          this.emit(event, data);
        }
      }
    } else {
      this.emit("$", String(this.ctx));
    }

    this.emit("vnjson.exec", this.ctx);
  }

  next() {
    if (this.getCurrentLabelBody().length - 2 < this.state.index) {
      this.state.index = this.state.index;
      this.emit("warn", `NoWayOutOfTheLabel`);
    } else {
      this.state.index++;
      this.exec();
      this.emit("vnjson.next");
    }
  }

  use(plugin) {
    plugin.call(this, this.tree);
  }

}

function log () {
  console.log(...arguments);
}

/**
 * jump: scene.label        # jump between scenes
 * jump: label              # jump inside the scene
 * jump: scene.label.7      # jump to index position
 * jump: _mark_1            # jump to a point inside the label
 */
function jump (_pathname) {
  const pathname = String(_pathname);
  /**
   * Обработка прыжка по менткам _mark
   */

  if (/^_/i.test(pathname)) {
    const labelBody = this.getCurrentLabelBody();
    if (labelBody.length === 0) return;
    const index = labelBody.map(ctx => {
      return ctx.hasOwnProperty(pathname);
    }).indexOf(true);
    const label = [this.state.sceneName, this.state.labelName, index].join(".");
    this.exec({
      jump: label
    });
  } else {
    const path = pathname.split(".");
    this.state.index = path[2] || 0; //label

    if (!/\./i.test(pathname)) {
      this.state.labelName = path[0];
      this.emit("jump.init", false);
      this.exec();
    } //scene.label


    if (/\./i.test(pathname)) {
      this.state.sceneName = path[0];
      this.state.labelName = path[1];
      this.emit("jump.init", true);
      this.exec();
    }
  }
}

/**
 * - +: Append chunk to phrase
 */
function append (reply) {
  if (!this.state.character) {
    this.state.character = this.tree.$root.characters[0];
  }

  this.emit("vnjson.character", this.state.character, reply, true);
}

/**
 * timeout:
 *   timer: 1000
 *   exec: # deprecated
 *      $: Time is over
 *   onEnd:
 *      $: Time is over
 */
function timeout (args) {
  setTimeout(() => {
    this.exec(args.onEnd || args.exec);
  }, args.timer);
}

/**
 * next: true
 */
function next () {
  setTimeout(() => this.next(), 50);
}

const vnjs = new Vnjson();
/**
 * init plugins
 */

vnjs.on("log", log);
vnjs.on("jump", jump);
vnjs.on("+", append);
vnjs.on("timeout", timeout);
vnjs.on("next", next);

export { vnjs as default };
//# sourceMappingURL=vnjson.js.map
