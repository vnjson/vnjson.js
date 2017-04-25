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
  })

```
