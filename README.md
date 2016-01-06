
##renjs
Visual novel engin for web
>You can write a script for Visual Novel on JSON5 or YAML,
> then convert to JSON.

###How to use it?

####Define characters.

```yaml
#YAML
# game/{{scene}}/{{label}}/characters.yml
pr:
  name: Профессор
  color: green
al:
  name: Алиса
  color: red

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

