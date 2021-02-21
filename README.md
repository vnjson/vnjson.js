
# vnjson.js
> Vnjson Scripting language interpreter

## Discription
[__`vnjson/scheme`__](https://github.com/vnjson/scheme)

## Demo
[__`Text quest`__](https://vnjson.github.io/vnjson.js/demo/simple-text-quest/)


[__`Visual novel`__](https://vnjson.github.io/vnjson.js/demo/visual-novel/)

## Synopsis
```js

const vnjs = new Vnjson();

// plugins
vnjs.on('*', e=>{
	console.error(`Plugin [ ${e} ] not found`);
});
vnjs.on('alert', msg=>alert(msg))
const __scenes = [
	{name: 'scene', url: "/scenes/scene.json"},
	{name: 'chapter2', url: "/scenes/chapter2.json"}
];

vnjs.getScenes(__scenes, function (scene, next){
fetch(scene.url)
  .then( res=> res.json() )
  .then( body=>{
  	vnjs.setScene(scene.name, body);
  	next();
  });
});
//Call after on scenes load
vnjs.on('ready', function(){

document.body.addEventListener('mousedown', e=>{
			vnjs.next();
});
//entry-point
vnjs.exec({jump: 'scene.label'})

})

```


## System plugins

```js
.on('jump') //Handles script navigation [ scene.label ||label ] exec({jump: 'label'})
.emit('character', character, 'reply') // {al: 'Hello world'} character.id == 'al'
.emit('print', 'reply') // if ctx == "string"
.emit('*') // not found event
.emit('exec') // emit after the execution  [ ctx ]
.emit('ready') // scenes loaded

```
## API
```js
//execute current obect
.exec({userEvent: "hello world"})
//listen user events emit in game sript
.on('userEvent', function (ctx){
		// [ ctx ] current object
		alert(ctx)
})
.emit('event', ...args)//emit event

.next() //execute next sting in script
.index //Position in current label
.getScenes (__scenes, function(scene, next){
	let sceneBody = someSceneLoader(scene.url)
	this.setScene(scene.name, sceneBody)
	next('once')//[once] Loads scenes as [jump] needed
});

.getCurrentLabelBody()//return label Array
.getCtx()// return current Object
```


## Community
* [__`vk.com/vnjson`__](https://vk.com/vnjson)

