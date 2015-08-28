$(document).ready(function(){

var riteres = new RenJs(game);
/*
function counter(param){

	//var i = 0;
	return function(param){
		if(param==='next'){
				++riteres.i;
				//riteres.parse()

		}
		else if(param==='pref'){
				--riteres.i;
				
		}

	}
	riteres.parse()
}
var count = counter();
$(window).bind('mousewheel DOMMouseScroll', function(event){

    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        // scroll up
        	count('pref')
       
    }
    else {
       
       		count('next')
    }
});
*/

})

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
	//parallax:true
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
game.define = {

	dialog_box:function(param){
		if(param ==='hide'){
			$('#dialog_box').hide();
			$('#name_box').hide();
		}
		if(param ==='show'){
			$('#dialog_box').show();
			$('#name_box').show();
		}
	},
	/*
	i:function(num){
	
	if(this.i>this.label.length){
		alert("Такого значения не существует")
	}
	else {
		this.i = num;
		this.parse();
	}
	},*/
	/*
	name_box:function(param){
		if(typeof(param) === "boolean"){
			if(param){
				$('#name_box').show()
			}
			else {
				$('#name_box').hide()
			}
		}
	},*/
	save:function(){
		/*var memory_card = [];
			memory_card.push(this.i);*/
			//localStorage()
			/*
			localStorage.i = this.i;
			localStorage.label = this.label;*/
		//alert(this.label+": "+memory_card[0])

	},
	load:function(){
		//this.parse()
		/*this.label = localStorage.label;

		this.i = Number(localStorage.i) - 1;
		*/
		//alert(this.interator)
		
		var kserks = store.get('kserks');
		this.label = kserks.label;
		this.i = kserks.i;
		/*
		this.interator.kasin = 'hello urod'
		console.log(this.interator)
		*/
		
	}
}




game.labels['start'] = [
{
	scene:"mm",
	//dialog_box:"hide",
	
	menu:{
		'Новая игра':'lab',
	}
}
]


