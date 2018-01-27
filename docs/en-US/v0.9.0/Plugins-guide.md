## Plugins


=
Plugins it's event listener emmited from userscript
=

### Simple plugin

__`plugin.js`__
```js

vnjs.on('plugin', function(data){

    console.log(data);//Hello world

});


vnjs.on('print', console.log);
vnjs.on('info', console.info);
vnjs.on('warn', console.warn);
```

Simple scene
___`scene.json`___
```js
{
  "mylabel":[
      {"plugin": "Hello world"},
      {"warn": 1}
  ]
}

```
or
```js
vnjs.parse({plugin: 'Hello world '})
```

