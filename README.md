### vnjson.js

>Делаем визуальные новелы на javascript



### Инициализация
```javascript
  vnjs.init({
    scenesDirectory: 'scenes',
    local: 'ru-RU',
    entry: 'start/chapter1',
    prefix: '#vnjson__'
  });

```




#### Как написать плагин

### Плагины



##### Вызываются из пользовательского скрипта
```javascript
  vnjs.on('alert', function(param){
    alert('hello_world!');
  });

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
  /*
   * Перед началом процесса загрузки сцены
   * Здесь можно повещать css индикатор процесса загрузки
   */
})
vnjs.on('loaded', (e)=>{
  /*
   * Файл сцены загружен
   * Нужно загрузить картинки preload
   */
});
```

###### Memory card
```javascript

vnjs.on('save', function(){
  alert('Игра сохранена');
});

vnjs.on('load', function(){
  alert('Игра загружена');
})

```

##### Нативные методы
```javascript
vnjs.parse() // Может парсит текущий объект контекста

vnjs.parse({pr:'Привет мир', left: 'lusil'})
// так же может иметь один аргумент. Передаваемый в
// него _obj - который единоразаво вызывает методы
// переданного объекта


vnjs.ctx /*
    {
      scene,
      label,
      num,
      arr,
      obj
    }
    // Текущий объект. Значиние которого меняется с каждым
    // выполнением события vnjs.on('parse');
*/

  init({config})
  game,
  getScene,
  config, // vnjs.init(/*{ config }*/)

  emit - Подписчик на события .


```