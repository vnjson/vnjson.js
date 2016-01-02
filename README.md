
##renjs
Visual novel engin for web
>You can write a script for Visual Novel on JSON5 or YALM!
###How to use it?

####Define characters.

```yaml
#YAML
# game/{{scene}}/{{label}}/characters.yml
pr:
  name: Профессор
  color: green
la:
  name: Ладья
  color: blue
al:
  name: Алиса
  color: red
ki:
  name: Кирон
  color: gold

```

or

```javascript
//JSON5
//game/{{scene}}/{{label}}/characters.json5
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
```yaml
# game/{{scene}}/{{label}}/labels/start.yml
-
  pr: Привет Алиса
   scene: room_41
   audio: room_41
   left: prof
- al: Здравствуйте профессор
   right: alice
- pr: Хорошая погодка, не правда ли?
- al: Да соглашусь с этим
- pr: Ладно пошли в лабалаторию
   jump:lab/lab

```
or
```javascript
//game/{{scene}}/{{label}}/labels/start.json5
[
	{pr:'Привет Алиса',scene:'room_41',audio:'room_41',left:'prof'},
	{al:'Здравствуйте профессор',right:'alice'},
	{pr:'Хорошая погодка, не правда ли?'},
	{al:'Да соглашусь с этим'},
	{pr:'Ладно пошли в лабалаторию',jump:'lab/lab'}
]
```

