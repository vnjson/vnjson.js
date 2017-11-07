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

```

Simple scene
___`scene.json`___
```js
{
  "mylabel":[
      {"plugin": "Hello world"}
  ]
}

```
or
```js
vnjs.parse({plugin: 'Hello world '})
```

