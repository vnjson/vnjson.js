/*plugins*/
vnjs.on('pr', function(text){
	console.log('Проффессор: '+text);
});
vnjs.on('al', function(text){
	console.log('Alice: '+text);
});

vnjs.on('warn', function(text){
	console.warn(text)
})
vnjs.on('info', function(text){
	console.info(text)
});
vnjs.on('error', function(text){
	throw text;
})

vnjs.on('jump', function(pathname){
	state.index = 0;
	state.label = pathname;
	parse();
});


function choise(n){
	let menuItem = current.label()[0].menu[n];
		for(let key in menuItem){
			parse(menuItem[key])
			state.index++
		}

}
vnjs.on('menu', function(menu){

	let i = 0;
	menu.map(item=>{
		
		for(let key in item){
			console.warn(`[${i}] [ ${key} ]`)
		}
		i++;
	})


})