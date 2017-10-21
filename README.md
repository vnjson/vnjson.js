# vnjson.js
> Visual novel engine for web

## Simple usage without dependencies

```js
/*
 * Simple scene
 */
const sceneObject = {
       //assets: [{}],
         labelName: [
          {print: 'Hello ', info: 'Press enter the vnjs.next()'},
          {print: 'world!' },
          {print: "I'm don't"},
          {print: 'speak'},
          {print: 'English'}
         ]
};

/*
 * Add scene to the {game} and {ctx}
 */
vnjs.setScene("sceneName", sceneObject, "labelName");

/*
 * Add simple plugins
 */
vnjs.on('print', console.log);
vnjs.on('info', console.info);

/*
 * Execute current object (ctx.obj) === sceneObject.LabelName[0]
 */
vnjs.parse();

//vnjs.next() // reading the next string
```
## Basic usage 
### deps
- [`vnjson-get-scene`](https://github.com/vnjson/vnjson-get-scene)
- [`vnjson-jump`](https://github.com/vnjson/vnjson-jump)
- [`vnjson-preload`](https://github.com/vnjson/vnjson-preload)

## Init

```js
const config = {
        scenesDir: './scenes'
      };
      
vnjs.init(config);

```


## Preload assets scene

```js
vnjs.on('preload', ()=>console.log('[ preload ]'))
vnjs.on('asset', asset=>console.log(asset.path))
vnjs.on('postload', ()=>{
 console.log('[ postload ]')
 vnjs.parse();// reading first string in current scene
})
```
## Scene load
__`scene1.json`__

```json
{
  "assets": [
     {"path": "./background.png", "type": "image", "id": "bg"}, 
     {"path": "./maintheme.mp3", "type": "audio", "id": "main"}
  ],
  "label1": [
     {
      "print": "Hello ", 
      "audio": "main"
      },
     {"print": "world!"},
     {"jump": "label2"}
  ],
  "label2": [
    {"print": "game is over"}
  ]
}
```

```js
 vnjs.parse({
   jump: "scene1/label1"
 });
 
/*
 * Execute next string
 */ 
document.body.addEventListener('click', ()=>{
  vnjs.next(); 
}) 
```


## Text output
```js
vnjs.on('print', console.log)


```
## Plugins
- [`vnjson-get-scene`](https://github.com/vnjson/vnjson-get-scene) Scenes loader
- [`vnjson-jump`](https://github.com/vnjson/vnjson-jump) Jumps between scenes and labels. 
- [`vnjson-preload`](https://github.com/vnjson/vnjson-preload) Preload assets scene 
- [`vnjson-get-screens`](https://github.com/vnjson/vnjson-get-screens) Screens loader
- [`vnjson-screen`](https://github.com/vnjson/vnjson-screen) Show/hide screen
- [`vnjson-menu`](https://github.com/vnjson/vnjson-menu) In-game choice
- [`vnjson-audio`](https://github.com/vnjson/vnjson-audio) Audio event listener
- [`vnjson-vibrate`](https://github.com/vnjson/vnjson-vibrate) Mobile browser vibbration API
- [`vnjson-filter`](https://github.com/vnjson/vnjson-filter) Css filters


## Simple plugin

```javascript

  vnjs.on('alert', function(msg){
    alert(msg);
  });
  vnjs.parse({ alert: 'Hello World!' });

```
## Scene scheme
```json
{
  "assets": [
    {
      "path": "./path-to-the-file.png", 
      "type": "image",
      "id": "myId",
      "size": "73kb",
    },
    {
      "path": "./path-to-the-file.mp3", 
      "type": "audio",
      "id": "myId",
      "size": "144kb",
    }
  ],
  "labelName1": [
    {"print": "hello labelName 1"},
    {"jump": "labelName2"}
  ],
  "labelName2": [
    {"alert": "Game Over!"}
  ]
}
```

## API
```javascript
vnjs.next() //num ++
vnjs.prev(); //num--
vnjs.parse() //num===num

vnjs.parse({pr:'Привет мир', left: 'lusil'})
// так же может иметь один аргумент. Передаваемый в
// него _obj - который единоразаво вызывает методы
// переданного объекта
ctx /*Текущий объект. Значиние которого меняется с каждым
     выполнением события vnjs.on('parse');*/



// * game - .scenes[ctx.sceneName], .package, .settings
// * config - vnjs.init(/*{ config }*/)

// * setScene - Принимает объект сцены
// * setLabel - Передаем имя метки и массив с пользовательскими скриптами
 
 // * next - Передвинуться по массиву в перед. 
 // * prev -  Выполняет тоже что и next, но только в обратную сторону.
 // * parse - 
 // * emit - Подписывается на события
 // * off - Отписывается от событий
 // * on - Слушает события
 // * fetch - fetch(url).then

```

## Documentation
* <a href="https://github.com/vnjson/vnjson.js/blob/master/docs/Getting-Started.md"><code><b>Getting Started</b></code></a>
* <a href="https://github.com/vnjson/vnjson.js/blob/master/docs/Scene-scheme.md"><code><b>Scene scheme</b></code></a>
* <a href="https://github.com/vnjson/vnjson.js/blob/master/docs/Create-characters.md"><code><b>Create characters</b></code></a>
* <a href="https://github.com/vnjson/vnjson.js/blob/master/docs/Plugins.md"><code><b>Plugins</b></code></a>
* <a href="https://github.com/vnjson/vnjson.js/blob/master/docs/Publish.md"><code><b>Publish</b></code></a>


