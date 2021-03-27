
# vnjson.js
> Vnjson Scripting language interpreter

## Demo

![api v1.5.0](https://img.shields.io/badge/api-v1.5.0-brightgreen?style=flat-square) [__`Text Quest`__](https://vnjson.github.io/vtq-tpl/dist/)

![api v1.3.6](https://img.shields.io/badge/api-v1.3.6-brightgreen?style=flat-square) [__`Visual Novel`__](https://vnjson.github.io/vpv-tpl/dist/)

## Discription
[__`vnjson/scheme`__](https://github.com/vnjson/scheme)

## Utils
> vnjson-pixi-vue
[__`vpv-tpl`__](https://github.com/vnjson/vpv-tpl) - bolerplate

## Synopsis
```js

const vnjs = new Vnjson();

/**
 *  plugins
 */
function notFound(){
	this.on('*', e=>{
		console.error(`Plugin ${e} not found`)
	});
}

vnjs.use(notFound);

vnjs.use(function (){
	this.on('character', (character, reply)=>{
		console(character.name, reply);
	})
});

/**
 * The jump plugin is required to navigate
 * between scenes and labels
 * https://github.com/vnjson/vnjson-jump
 */
vnjs.use(jumpVnjson);

const TREE = {
	$root: {
		pacakge: {entry: 'scene_1.entry'},
		characters: [
			{id: 'a', name: 'Alice'}
		]
	}, 
	scene_1: {
		assets: [],
		entry: [
			"Some reply",
			{jump: 'label_2'}
		],
		label_2: [
			{jump: 'scene_2.start'}
		]
	},
	scene_2: {
		start: []
	}
};


vnjs.setTree(TREE);

/**
 * Set first label
 */
vnjs.emit('jump', TREE.$root.package.entry)
/**
 * Called after the scene or label 
 * has been initialized
 */
vnjs.on('init', scene=>{
	if(scene){
		console.log('isScene')
	}
	//Execute first ctx object
	vnjs.exec();
})

/**
 * Each time it is pressed,
 * the float moves down the tree
 */
document.body.addEventListener('click', e=>{
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
.getCharacterById(id)

.setTree(TREE)

.current: {
	index: 0, //Position in current label
	labelName: 'string',
	sceneName: 'string'
}
```

## System plugins

```js

.emit('character', character, 'reply') // {al: 'Hello world'} character.id == 'al'
.emit('*') // not found event
.emit('exec') // emit after the execution  [ ctx ]

```

## Community
* [__`vk.com/vnjson`__](https://vk.com/vnjson)

