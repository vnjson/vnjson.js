
# vnjson.js
> Vnjson Scripting language interpreter

## Discription
[__`vnjson/scheme`__](https://github.com/vnjson/scheme)

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
## Scene scheme
>__/scenes/scene.json__
```json
{
	"assets": [
		{"name": "bg1", "url": "/assets/background-1.png"},
		{"name": "mainTheme", "url": "/assets/mainTheme.mp3"}
	],
	"characters": [
		{"id": "al", "name": "Alice"}
	],
	"label": [
		"Hello world!",
		{"alert": "This is work!"},
		{"scene": "bg1", "audio": "mainTheme"},
		{
			"menu": {
				"?": "What do you want to do?",
				 "chapter2.start" :"I want to talk to Alice",
				 "-10label": "I do not want to do anything"
			}
		}
	],
	"-10label": [
		{"alert": "Game Over!", "point": -10}
	]
}

```
>__/scenes/chapter2.json__
```json
{
	"assets": [],
	"characters": [],
	"start": [
		{"al": "Hi my name is Alice"},
		{"jump": "gameOverLabel"}
	],
	"gameOverLabel": [
		{"print": "Game over"}
	]
}
```
## The scene is assembled from chunks of YAML

> This is given to third-party libraries for implementation

>__characters.yml__
```yaml
- al: Alice
- jn: John
```
>__label.yml__
```yaml
- Hello world!
- alert: This is work!
- scene: bg1, 
  audio: mainTheme
- menu: 
   ?: What do you want to do?
   chapte2.start: I want to talk to John
  -10label: I do not want to do anything


```
>__-10label.yml__
```yaml
- alert: Game Over!
  point: -10
```

## Tools
[__`scenes-to-json`__](https://github.com/vnjson/scenes-to-json) - Yaml scenes to json
 	
[__`YAML JavaScript execr`__](http://nodeca.github.io/js-yaml/) - Online Yaml linter


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

