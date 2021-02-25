
# vnjson.js
> Vnjson Scripting language interpreter

## Discription
[__`vnjson/scheme`__](https://github.com/vnjson/scheme)

## Demo

[__`Visual novel`__](https://vnjson.github.io/vpv-tpl/dist/)

## Utils
> vnjson-pixi-vue
[__`vpv-tpl`__](https://github.com/vnjson/vpv-tpl) - bolerplate

## Synopsis
```js

const vnjs = new Vnjson();

// plugins
function notFound(){
	this.on('*', e=>{
		console.error(`Plugin ${e} not found`)
	})
}

vnjs.use(notFound);

vnjs.use(function (){
	this.on('print', msg=>{
		console(msg);
	})
});


const scene_1 = {
	assets: [
		{name: 'bg', url: './assets/background.jpg'}
	],
	characters: [
		{name: 'al', text: 'Alice', color: 'darkcyan', age: 24 }
	],
	label_1: [
		"hello", //narrator
		{print: 'world'}, //narrator
		{al: 'Some reply', audio: 'main-theme', scene: 'bg'}, //charcter reply
		{
			menu: {
				'?': 'Some quetion',
				'menu item 1': 'label_2'
			}
		},
		label_2: [
			{jump: 'scene2.label_1'}
		]
	]
};

const scene_2 = {
	assets: [],
	characters: [],
	label_1: []
}
/**
 * sceneName
 * sceneBody
 */
vnjs.setScene('scene_1', scene_1)
vnjs.setScene('scene_2', scene_2)

//vnjs.emit('jump', 'scene_1.label_1')
vnjs.exec({
			jump: 'scene_1.label_1' //entry
		})

document.body.addEventListener('mousedown', e=>{
			vnjs.next();
});



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

.getCurrentSceneBody()// return current scene object
.getCurrentLabelBody()//return label Array
.getCtx()// return current Object
.getCurrentCharacter()
.getCharacterByName(name)

.setScene(sceneName, sceneBody)

.current: {
	index: 0, //Position in current label
	labelName: 'string',
	sceneName: 'string',
	characterName: 'sting',
}
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

## Community
* [__`vk.com/vnjson`__](https://vk.com/vnjson)

