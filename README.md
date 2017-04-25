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
##### Файловая структура плагина

```plane_text
plugins
├── alert
│   ├── index.js
│   ├── package.json
│   └── README.md
├── debug
│   ├── index.js
│   ├── package.json
│   └── README.md

```
#### Библиотеки
Если же вы хотите добавить в зависимость к вашему плагину
библиотеку, то положите файл библиотека в каталог /lib 
