function vnjsonClear(stage){
if(stage){
	let i = _screens[stage].children.length-1;
	for (i; i>=0; i--){
		_screens[stage].removeChild(_screens[stage].children[i]);
	};
}
else{
		let i = app.stage.children.length-1;
		for (i; i>=0; i--) {	
			app.stage.removeChild(app.stage.children[i]);
		};	
	}
}