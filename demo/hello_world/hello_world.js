window.onload = function(){
	ren.run(game);
}
var game = {
	labels:{},
	layers:{}
};
game.options = {
	elem:"#game",
	startLabel:'start',
	reverse:false
};

game.images = {
	"mm":"assets/mm.png",
	"shadow":"assets/shadow.png"
}

game.characters = {
	he:{
		name:'Герой'
	},
	sh:{
		name:'Тень героя'
	}
};
game.layers["center"] = {
	parent:'scene',
	width:200,
	height:300,
	top:50,
	left:200
}
game.labels["start"] = [
	{pr:'Привет мир!',scene:'mm'},
	{
		sh:'И тебе не хворать',
		center:"shadow",
		jump:'part2'
	}

];

game.labels["part2"] = [
	{pr:'Ты не должна продолжать идти работать!'},
	{sh:'Нет это то чего я желаю!'}
]