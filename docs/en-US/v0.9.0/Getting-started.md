## Usage 


## Init
__`scenes/scene1.json`__
```json
{
  "assets": [
     {"path": "./background.png", "type": "image", "id": "bg"}, 
     {"path": "./maintheme.mp3", "type": "audio", "id": "main"}
  ],
  "characters": [ { "al": { "name": "Alice", "color": "red" } } ],
  "chapter1": [
    {"al": "hello"},
    {"al": " world"}
  ]
}
```


## Preload assets scene

```js
vnjs.on('preload', ()=>console.log('[ preload ]'))
vnjs.on('asset', asset=>console.log(asset.path))
vnjs.on('postload', ()=>{
 console.log('[ postload ]')
 vnjs.parse();// reading first string in current scene
})

```js

vnjs.init({
        gameDir: "./"
        scenesDir: 'scenes'
    });

vnjs.parse({ jump: "scene1/chapter1" });
/*
 * Execute next string
 */ 
document.body.addEventListener('click', ()=>{
  vnjs.next(); 
}) 
```
