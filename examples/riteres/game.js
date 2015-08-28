$(document).ready(function(){
		new RenJs(game);
});

var game = {
		labels:{},
}

game.scripts = [
	'scenes/lab.js',
	'scenes/ya_prosnulsya.js'
];

game.options = {
	el:"#game",
	startLabel:'start',
	textSpeed:0,
}


game.characters = {

	rl:{
		name:'Ладья',
		color:'red',
		textColor:'red',
	},
	pr:{
		name:'Профессор',
		color:'green',
		textColor:'green'
	},
	narrator:{
		name:"",
		textColor:'#fff'
	}
}

game.images = {
	'mm':'assets/mm.jpg',
	'errors':'assets/errors.png',
	'lab':'assets/lab.png',
	'rl_normal':'assets/char/rite_ladya.png',
	'prof':'assets/char/prof.png',
	'hero':'assets/char/hero.png'

}
/*
	Здесь можно определять свои ключевые слова, 
	которые будут выполняться
*/
game.define = {
	alert:function(text){
		alert(text);
	}
}




game.labels['start'] = [
{
	scene:"mm",
	alert:"hello world",
	
	menu:{
		'Новая игра':'lab',
	}
}
]


