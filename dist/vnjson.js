"use strict";

/*
 * minivents
 */
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
'use strict';

var vnjs = new Object();
var DEBUG = false;
/*
 * TREE[SCENE_NAME] = SCENE_OBJECT;
 */
var TREE = {};
/*
 * В {state} должно помещаться все то
 * что сохроняется в карту памяти
 * И что важно загрузить из нее без последствий.
 * В состоянии не должно быть мусора
 */
var state = {
  scene: 'scene',
  label: 'label',
  index: 0
  /*
   * Получает текущее тела из состояние
   */
};function setScene(name, body) {
  TREE[name] = body;
  state.scene = name;
}

var current = {

  scene: function scene() {
    return TREE[state.scene];
  },
  label: function label() {
    return TREE[state.scene][state.label];
  },
  object: function object() {
    return TREE[state.scene][state.label][state.index];
  }
};

var ev = new Events(); //EventEmitter
var on = ev.on,
    emit = ev.emit,
    off = ev.off;


function parse(obj) {
  var ctx = null;
  if (obj) {
    ctx = obj;
  } else {
    ctx = current.object();
  }

  for (var event in ctx) {

    emit(event, ctx[event]);
  }
}

function next() {
  parse();
  state.index++;
  return '-------------------------';
}

function init(conf) {}

vnjs = {
  next: next,
  parse: parse,
  init: init,
  on: on,
  emit: emit,
  off: off,
  state: state,
  setScene: setScene,
  TREE: TREE,
  DEBUG: DEBUG,
  current: current
  /*
  if (typeof pattern !== 'string') {
      throw new TypeError('glob-base expects a string.');
    }
  
  
  if (typeof obj !== 'object') {
      throw new TypeError('Expected an object');
    }
  
      
  */

};