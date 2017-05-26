### vnjson.js

>Делаем визуальные новелы на javascript



### Инициализация
```javascript
  vnjs.init({
      startLabel: 'start/chapter1',
      scenesDir: 'scenes/',
      local: 'ru-RU',
      el: '#game',
      screensPrefix: 'vnjson__',
      screensPath: './dest/screens.html',
      screensClassName: 'vnjson__screen',
  }); 

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

##### Нативные события
```javascript
// autorun
vnjs.on(function(){
    console.log('autorun');
    //Вызывается во время скрина main-menu
});

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

```

###### getScene events
```javascript

vnjs.on('preload', (e)=>{
  console.log('Срабатывает перез загрузкой сцены')
})

vnjs.on('setscene', function(){
  console.log('Файл сцены загружен')
})

vnjs.on('load', (e)=>{
  console.log('Срабатывает после загрузки ресурсов')
});
```



##### Нативные методы
```javascript
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