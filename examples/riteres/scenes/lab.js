
game.labels['lab'] = [
{
	//load:null,
	aliase:'rl',
	//dialog_box:"show",
	text:"Профессор! Эти ошибки.. Разве нам не следует прекратить?!",
	scene:"errors",
	show:'rl_normal',
	//i:2

},
{aliase:'pr',text:"Нет! Не следует. Если не сейчас, то следующего цикла придется ждать пару столетий."},
{aliase:'rl',text:"i=>2; Но вправе ли мы?! Не думаю что Капитан это одобрит"},
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
	//save:null,
	show:'hero',
},
{aliase:'narrator',text:"Кто я? Где я? Ничего не помню.."},

{

	aliase:'pr',
	text:'Привет Я Профессор! И я тебя пробудил.',
	show:'prof',
	jump:'ya_prosnulsya',
}


]