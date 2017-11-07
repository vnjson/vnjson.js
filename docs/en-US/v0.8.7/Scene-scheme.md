
`public/game/scenes/en-US/scene1.json`
```json

{
  "assets": [
      {
        "path": "/assets/audio/myTheme.mp3",
        "size": "135kB",
        "id": "myfile",
        "type": "audio"
      },
      {
        "path": "/assets/audio/background.png",
        "size": "17kB",
        "id": "bg",
        "type": "image"
      }
  ],
  label1: [
    { "print": "hello world", "audio": myFile, "scene": "bg" },
    {"jump": "label2"}
  ],
  label2: [
    { "print": "Hello it's [ label2 ]" }
  ]
}



```