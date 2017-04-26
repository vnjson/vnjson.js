### vnjson.js

>Делаем визуальные новелы на javascript



### Инициализация
```javascript
  vnjs.init({
    scenesDirectory: 'scenes',
    local: 'ru-RU',
    entry: 'start/chapter1'
  });

```






#### Как написать плагин

### Плагины


##### Самовызывающиеся плагины [ autorun ]
```javascript
  vnjs.on(function(){
    console.log('autorun');
  });

```
##### Вызываются из пользовательского скрипта
```javascript
  vnjs.on('alert', function(param, ctx){
    alert(ctx.scene)
  });

```

##### Нативные события
```javascript

vnjs.on(()=>{
  /*
   * Вызвается autorun
   * 
   */
}) 

vnjs.on('next', (e){
  /*
   * Срабатывает при каждом парсинге текущего объекта
   */
});

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
})
```