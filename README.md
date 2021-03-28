
# vnjson.js
> Vnjson Scripting language interpreter

## Description
[__`vnjson/scheme`__](https://github.com/vnjson/scheme)



## Demo

[__`Text Quest`__](https://vnjson.github.io/vtq-tpl/dist/)

[__`Visual Novel`__](https://vnjson.github.io/vpv-tpl/dist/)


## Install

### Browser
[__`<script src="https://unpkg.com/vnjson.js@1.6.0/dist/vnjson.js"></script>`__](https://unpkg.com/vnjson.js@1.6.0/dist/vnjson.js)

### NodeJS
```bash
npm install vnjson.js
npm install scenes-to-json -D
```


## Utils

[__`vtq-tpl`__](https://github.com/vnjson/vtq-tpl) - Text quest template

[__`vpv-tpl`__](https://github.com/vnjson/vpv-tpl) - Visual novel template


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
			{"a": "Alice say hello world"}
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

## Community
* [__`vk.com/vnjson`__](https://vk.com/vnjson)

