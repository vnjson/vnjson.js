## Usage 

### deps
- [`vnjson-get-scene`](https://github.com/vnjson/vnjson-get-scene)
- [`vnjson-jump`](https://github.com/vnjson/vnjson-jump)
- [`vnjson-preload`](https://github.com/vnjson/vnjson-preload)

## Init

```js
const config = {
        scenesDir: './scenes'
      };
      
vnjs.init(config);

```


## Preload assets scene

```js
vnjs.on('preload', ()=>console.log('[ preload ]'))
vnjs.on('asset', asset=>console.log(asset.path))
vnjs.on('postload', ()=>{
 console.log('[ postload ]')
 vnjs.parse();// reading first string in current scene
})
```
## Scene load
__`scene1.json`__

```json
{
  "assets": [
     {"path": "./background.png", "type": "image", "id": "bg"}, 
     {"path": "./maintheme.mp3", "type": "audio", "id": "main"}
  ],
  "label1": [
     {
      "print": "Hello ", 
      "audio": "main"
      },
     {"print": "world!"},
     {"jump": "label2"}
  ],
  "label2": [
    {"print": "game is over"}
  ]
}
```

```js
 vnjs.parse({
   jump: "scene1/label1"
 });
 
/*
 * Execute next string
 */ 
document.body.addEventListener('click', ()=>{
  vnjs.next(); 
}) 
```


## Text output
```js
vnjs.on('print', console.log)


```