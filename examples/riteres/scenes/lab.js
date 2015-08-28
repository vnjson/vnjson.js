
game.labels['lab'] = [
{
	aliase:'rl',
	text:"Профессор! Эти ошибки.. Разве нам не следует прекратить?!",
	scene:"errors",
	show:'rl_normal',
},
{aliase:'pr',text:"Нет! Не следует. Если не сейчас, то следующего цикла придется ждать пару столетий."},
{aliase:'rl',text:"Но вправе ли мы?! Не думаю что Капитан это одобрит"},
{aliase:'pr',text:"Если не мы, то кто?! У нас нет времени раздумья. Мы должны действовать."},
{
	aliase:'pr',
	text:"Сейчас или никогда! Если тебя еще что то не устравает - ты знаешь где выход.",
	scene:"lab",
	jump:"probuzdenie"
}

]

game.labels['probuzdenie'] = [

{
	aliase:"narrator",
	text:'Я проснулся!',
	show:'hero',
},
{aliase:'narrator',text:"Кто я? Где я? Ничего не помню.."},

{

	aliase:'pr',
	text:'Привет Я Профессор! И я тебя пробудил.',
	show:'prof',
	jump:'ya_prosnulsya',
}


];