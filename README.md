
[![release](https://img.shields.io/badge/release-v0.7.8-brightgreen.svg?style=flat-square)](https://github.com/vnjson/vnjson.js/releases/download/v0.7.5-beta/vnjson_pure-core.zip)
[![license](https://img.shields.io/npm/l/express.svg?style=flat-square)]() 
### vnjson.js
> Visual novel engine for web



include plugins in your index.html
[vnjson-jump]('https://github.com/vnjson/vnjson-jump')


## Init

```js
vnjs
  .init({})
  .on('print', console.log)
  .parse('print: Hello')
  .parse({'print': 'World!'});
```


## create characters
```js
vnjs.on('reply', function(param){
  let { reply, character } = param;
  console.log(character.name+": "+reply);
});



vnjs.on('al', function(reply){
  let data = {
          name: 'Alice',
          color: 'red',
          reply
        };
  this.emit('reply', data);
});

vnjs.on('prof', function(reply){
  let data = {
          name: 'Proffesor',
          reply
        };
  this.emit('reply', data);
});

vnjs.parse('prof: Hello World!');
vnjs.on('print', console.log);
vnjs.parse({
         'al': 'Hello Proffesor!', 
         'print': "bla bla"
        });

```


// navigator events
```
vnjs.on('next', function(e){
  /*
   * Срабатывает при каждом парсинге текущего объекта
   */
});
vnjs.on('parse', function(ctxObj){
  //Вызывается во время парсинга текущего объекта ctx.obj
  // Также принимает один аргумен. Текущий объект.
});


vnjs.next() ++
vnjs.parse() -current-
vnjs.prev(); --


vnjs.on('setscene', function(){
  console.log('Файл сцены загружен')
});

vnjs.on('setlabel', function(labelName){})

```

##### Нативные методы
```javascript
vnjs.init({
  data: 'conf'
});

vnjs.on('getscreens', function(){
  
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


```



### Плагины

##### Вызываются из пользовательского скрипта
```javascript

  vnjs.on('alert', function(msg){
    alert(msg);
  });
  vnjs.parse({ alert: 'Hello World!' });

```
