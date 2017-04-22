###vnjson.js


###Инициализация
```javascript
  vnjs.init({
    scenesDirectory: 'scenes',
    local: 'ru-RU',
    entry: 'start/chapter1'
  });

```

###Плагины

#####Самовызывающиеся плагины [ autorun ]
```javascript
  vnjs.on(function(){
    console.log('autorun');
  });

```
#####Вызываются из пользовательского скрипта
```javascript
  vnjs.on('alert', function(param, ctx){
    alert(ctx.scene)
  })

```

###Структура сцены *.json
>./scenes/ru-RU/start.json

```json
{
  "labels":{
    "chapter1": [
      {
        "pr": "Привет! Давненько не виделись",
        "left":"prof_norm"
      },
      {
        "al": "Да уж, давненько.",
        "scene": "room_hero",
        "sound": "song1"
      },
      {
        "pr": "Хорош болтать! Погнали в лабараторию"
      },
      {
        "al": "Профессор вы слишком торопитесь. Это еще ни кому не помогало.",
        "scene":"roof"
      },
      {
        "pr": "Алиса не тебе меня поучать!",
        "left":"baka",
        "jump": "start/chapter2"
      }
    ],
    "chapter2": [
      {
        "al": "И как это понимать? Разве мы не должны позаботиться об этих ошибках?",
        "center": "errors",
        "sound": "errors"
      },
      {
        "pr": "Ты так ничему и не научилась..",
        "right": "chapter2"

      }
  ]
  },
  "preload": [
    "/assets/bg.png"
  ],
  "characters": [
    {
      "aliase": "pr",
      "name": "Профессор",
      "color": "green"
    },
    {
      "aliase": "al",
      "name": "Алиса",
      "color": "red"
    },
    {
      "aliase": "ll",
      "name": "Люсиль",
      "color": "grey"
    }
  ]
}


```
####Структура визуальной новеллы

```plane_text
public/game
├── assets
│   ├── room_hero.png
│   ├── prof_norm.png
│   └── errors.mp3
├── icons
│   ├── favicon.ico 
│   └── logo32x32.png
├── plugins
│   ├── aliase.js
│   ├── debug.js
│   ├── audio.js
│   ├── sound.js
│   ├── center.js
│   ├── right.js
│   ├── scene.js
│   ├── show.js
│   ├── snake.js
│   ├── blimb.js
│   └── left.js
├── scenes
│   ├── ru-RU
│   │   ├── start.json
│   │   └── lab.json
│   └── en-US
│       ├── start.json
│       └── lab.json
├── style.css
└── layers.html

```