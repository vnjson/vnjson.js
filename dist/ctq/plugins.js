function print(data){

var name = document.getElementById('name-box');
	name.innerHTML = data.name;	
var text = document.getElementById('text-box');	
	text.innerHTML = data.text;	
}

/*plugins*/
vnjs.on('pr', function(text){
	print({
		text,
		name: "Профессор",
		color: 'red'
	});

});
vnjs.on('al', function(text){
	print({
		text,
		name: "Алиса",
		color: 'red'
	});
});

vnjs.on('warn', function(text){
	console.warn(text)
})
vnjs.on('info', function(text){
	console.info(text)
});
vnjs.on('error', function(text){
	alert(text)
})

vnjs.on('jump', function(pathname){
	state.index = 0;
	state.label = pathname;
	parse();

});

vnjs.on('return', function(pathname){
	state.index = 0;
	state.label = pathname;
	parse();
})



//////next
window.addEventListener('load',e=>{

document.getElementById('next-btn')
		.addEventListener('mousedown', e=>{
	
			vnjs.next();

		})

})
//////////menu
vnjs.on('menu', function(menu){

var menuBox = document.getElementById('menu-box');

//handler
menuBox.addEventListener('mousedown', e=>{
	e.preventDefault();
	var menuItem = JSON.parse(e.target.getAttribute('data-ctx'));
	parse(menuItem);
	menuBox.innerHTML = "";
});

//render
	let i = 0;
	menu.map(item=>{
		
		for(let key in item){
			menuBox.innerHTML += `<b><a href="#" data-ctx='${JSON.stringify(item[key])}'>${key}</a></b><br>`
		};
		i++;
	})


})