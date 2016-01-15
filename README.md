
##renjs
Visual novel engin for web

###How to use it?

####Define characters.

```yaml
# game/{{scene}}/{{label}}/characters.yml
pr:
  name: Профессор
  color: green
al:
  name: Алиса
  color: red

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
