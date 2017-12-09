/*scene*/
var sceneBody = {
		mainMenu: [
			{
				warn: ' Начните игру набрав choise(0) ',
				menu: [
					{'Начать игру': { jump: 'label1' , point: 7}},
					{'Загрузить': { jump:'memoryCard', point: -10}},
					{'О нас': { jump: 'about', point: 12 }}
				]
			}
		],
		label1: [

			{pr: 'Привет я консольный квест'},
			{"pr": "hello world", info: "4 8 15 16 23 42"},
			{"warn": "Я знаю что вы сделали"},
			{"warn": "Прошлым летом"},
			{jump: 'label2'}
		],
		label2: [
		   {al: 'Привет уродец.'},
		   {al: 'Я тебе не Алла а Алиса. Девочка.'},
		   {jump: 'gameOver'}
		],
		gameOver: [
			{error: '[ Game Over ]'}
		],
		memoryCard: [
			{warn: 'Сохраненки для слабаков, если проигаешь придется начинать занаво'},
			{ return: 'mainMenu'}
		],
		about: [
			{ info: '## Игра разработанная что бы вернуться к азам', warn: 'Kasin Sergey'},
			{ return: 'mainMenu'}
		]
	};