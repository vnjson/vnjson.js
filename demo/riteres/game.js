
window.onload = function(){
	ren.run(riteres);
}
var riteres = {
	labels:{},
	layers:{}
}
riteres.options = {
	elem:'#game',
	startLabel:'lab',
	reverse:true
}

riteres.images = {
	'mm':'assets/mm.jpg',
	'errors':'assets/errors.png',
	'lab':'assets/lab.png',
	'rl':'assets/char/rite_ladya.png',
	'prof':'assets/char/prof.png',
	'hero':'assets/char/hero.png',
	'lusil':'assets/char/lusil.png'

}


riteres.characters = {
	pr:{
		name:'Профессор'
	},
	la:{
		name:'Ладья'
	}
}
riteres.define = {
	alert:function(text){
	
		alert(text)
	}
}
riteres.animation = {
	rotate:function(param){
		
		move("#"+param.layer)
  			.rotate(param.deg)
  			.duration(param.dur||1000)
  			.end();
	},
	snake:function(){
		move("#scene")
 			
  			.x(120)
 
  	
  			.duration(500)
  			.end();
	}
}

riteres.layers['right'] = {
	parent:'scene',
	height:300,
	width:150,
	top:30,
	left:400
}
riteres.layers['left'] = {
	parent:'scene',
	height:300,
	width:150,
	top:30,
	left:50
}

riteres.labels['lab'] = [
	{
		pr:'hello world',
		scene:"mm",
		//show:'prof',
		right:"lusil",
		left:'hero'
		
	},

	{
		la:'Мир был жесток к нам',
		//show:'rl',
		right:'prof',
		rotate:{deg:360,dur:500,layer:"left"}
	},
	{pr:'Но мы не боялись с ним бороться'},
	{
		la:'Я знаю что был не одинок',
		scene:'lab',
		//show:'prof'
	},
	{
		la:'Ты не должен быть таким, потому что мы тебя придумали',
		//snake:null,
		jump:'hell'
	}

];
riteres.labels['hell'] = [
{pr:'А я ведь говорил тебе быть!'},
{pr:'Но раз ты не послушал, то и сгинь теперь во <span style="color:blue">мгле!</span>'},
{la:'Профессор! Не горячитесь',jump:'hero_room'}
];

riteres.labels['hero_room'] = [
{pr:'Хватить за него <span style="color:red">заступаться</span>, ты тоже не без греха'},
{pr:'Ну что вы профессор, вы и так не должны были этого делать',jump:'paluba'}
];

riteres.labels['paluba'] = [
{pr:'Если честно то ты не должен был приходить в этот мир!'},
{
	pr:'Но раз уж на том сошлись <span style="color:yellow">звезды</span>, то так тому и быть',
	show:'hero',
	jump:'zvezdi'
}

];

riteres.labels['zvezdi'] = [
{la:'Если посмотреть в глубь мглы, то ты можешь увидеть звезы, а не они тебя'},
{
	show:'lusil',
	rotate:{deg:360,dur:500},
	pr:'Ладья! Хватить пудрить <b style="color:blue">мозги</b><br> нашего новорожденного брата!'}
]

/*
game.scripts = [
	'scenes/lab.js',
	'scenes/ya_prosnulsya.js'
];




game.labels['start'] = [
{
	scene:"mm",
	//dialog_box:"hide",
	
	menu:{
		'Новая игра':'lab',
	}
}
]
*/
