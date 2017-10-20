 [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)]() 
### vnjson.js
> Visual novel engine for web



## Init

```js
vnjs.init({
 scenesDir: './scenes'
})

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

vnjs.parse({
         print: "Hello world!"
        });

```


```

##### Методы
```javascript
vnjs.next() //num ++
vnjs.prev(); //num--
vnjs.parse() //num===num

vnjs.parse({pr:'Привет мир', left: 'lusil'})
// так же может иметь один аргумент. Передаваемый в
// него _obj - который единоразаво вызывает методы
// переданного объекта


```

 * ctx - Текущий объект. Значиние которого меняется с каждым
     выполнением события vnjs.on('parse');


  * game - .scenes[ctx.sceneName], .package, .settings
  * config - vnjs.init(/*{ config }*/)

  * setScene - Принимает объект сцены
  * setLabel - Передаем имя метки и массив с пользовательскими скриптами
 
  * next - Передвинуться по массиву в перед. 
  * prev -  Выполняет тоже что и next, но только в обратную сторону.
  * parse - 
  * emit - Подписывается на события
  * off - Отписывается от событий
  * on - Слушает события
  * fetch - fetch(url).then




### Simple plugin

```javascript

  vnjs.on('alert', function(msg){
    alert(msg);
  });
  vnjs.parse({ alert: 'Hello World!' });

```
