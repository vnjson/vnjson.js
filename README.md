### vnjson.js

> Visual novel engine for web

Download required plugin
[vnjson-jump]('https://github.com/vnjson/vnjson-jump')

```html
<head>
  <script src="./vnjson.js"></script>
  <script src="./vnjson-jump/index.js"></script>
</head>
<body>
  
<script>

var scene = { 

  assets: [],
  entry: [
    { print: 'Hello' },
    { print: 'world', alert: 'text'},
    { jump: 'chapter1' }
  ],
  chapter1: [
    { print: 'hello chapter1' },
    { print: 'Game over'}
  ]
};



vnjs.setLabel('entry');
vnjs.setScene('scene', scene);

vnjs.on('print', function(text){
  console.log(text);
})
document
  .querySelector('#next')
  .addEventListener('mousedown', function(e){

      vnjs.next();
  });

</script>
</body>

```





#### Как написать плагин

### Плагины



##### Вызываются из пользовательского скрипта
```javascript

  vnjs.on('alert', function(msg){
    alert(msg);
  });
  vnjs.parse({ alert: 'Hello World!' });

```


// navigator events
vnjs.on('next', function(e){
  /*
   * Срабатывает при каждом парсинге текущего объекта
   */
});
vnjs.on('parse', function(ctxObj){
  //Вызывается во время парсинга текущего объекта ctx.obj
  // Также принимает один аргумен. Текущий объект.
})




vnjs.on('setscene', function(){
  console.log('Файл сцены загружен')
})



```

##### Нативные методы
```javascript
vnjs.init({
  data: 'conf'
});
vnjs.on('init', function(config){
  console.log(config.data)//conf
});

vnjs.on('getscene', function(obj){
    //deps vnjson-jump
    this.setLabel(obj.label, []);
    ajax.get(`${obj.scene}.json`)
})


vnjs.parse() // Может парсит текущий объект контекста

vnjs.parse({pr:'Привет мир', left: 'lusil'})
// так же может иметь один аргумент. Передаваемый в
// него _obj - который единоразаво вызывает методы
// переданного объекта



 * ctx 
    {
      scene,
      label,
      num,
      arr,
      obj
    }
    // Текущий объект. Значиние которого меняется с каждым
    // выполнением события vnjs.on('parse');


  * game,
  * config, // vnjs.init(/*{ config }*/)

  * setScene - Принимает объект сцены
  * setLabel - Передаем имя метки и массив с пользовательскими скриптами
  * setCharacters - Принимает объект с персонажами и добавляет его в игру.
  * next - Передвинуться по массиву в перед. Может принимать аргумента
  * prev(2) - По умолчанию 1. Выполняет тоже что и next, но только в обратную сторону.
  * parse - 
  * emit - Подписывается на события
  * off - Отписывается от событий
  * on - Слушает события
  * init - Срабатывает вовремя инициализации 

```