
/*
new vnjs({
	gameDir: '',
    entry: 'start/menu',
    local: 'ru-RU',
    scenesDir: './book',
   
})*/


var sceneBody = {
	"assets": [],
	"characters": [
		{
			"name": "Профессор",
			"aliase": "pr",
			"colorText": "red",
			"nameColor": "red"
		}
	],
	"chapter1": [
		{"print": "hello world", "info": "0"},
		{"warn": "Я знаю что вы сделали"},
		{"warn": "Прошлым летом"}
	],
	"chapter2": [

	],
	"gameover": [
		{"print": "Game Over"}
	]

}


setScene('scene', sceneBody)
state.label = "chapter1";