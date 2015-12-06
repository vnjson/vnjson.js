
##renjs
Visual novel engin for web

###How to use it?

####Define characters.
```javascript
//game/characters.json5
{
	pr:{ 
		name:'Professor',
		color:'blue'
	},
	al:{
		name:'Alice',
		color:'red'
	}
}

```

#### Open the start file
```javascript
//game/scenes/start.json5
[
	{pr:'Привет Алиса',scene:'room_41',audio:'room_41',left:'prof'},
	{al:'Здравствуйте профессор',right:'alice'},
	{pr:'Хорошая погодка, не правда ли?'},
	{al:'Да соглашусь с этим'},
	{pr:'Ладно пошли в лабалаторию',jump:'lab/lab'}
]
```

```javascript
//game/scenes/lab/lab.json
[
	{al:'Вот мы и тут',scene:'labBg',audio:'hlopDver'},
	{
		pr:'Ну что начнем?!',
		menu:{
			'Приступить к эксперименту':'lab/startExpiroment',
			'Обсудить детали':'lab/details',
		}
	}
]
```

```javascript
//game/scenes/lab/startExpiroment.json5
[
	{al:'Профессор! Эти ошибки...'},
	{pr:'Не дрейфь, если мы не продолжим, то другой такой шанс еще не скоро представится.'}
]
```

```javascript
//game/scenes/lab/details.json5
[
	{pr:'Уже не первое тысячелетие, мы броздим безкрайние просторы бездны..'},
	{pr:'Снова и снова мы рождаемся и умираем, в этих телах.'}
]
```


 ###MIT license 
