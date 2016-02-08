ren.event.jump = function(pathname){
console.info("jump: "+pathname);
ren.current.scene =  pathname.split('/')[0];
ren.current.label =  pathname.split('/')[1];
ren.current.Number = 0;
if(ren.game.scenes[ren.current.scene]){
	//console.warn('Сцена уже загружена');
	ren.current.Number =-1;
	ren.current.Array = ren.game.scenes[ren.current.scene][ren.current.label]
}
else{
	/**
	 * load scene resourse 	
	 * @param {string} scene - current scene
	 * @param {string} label - current label
	 */
	
	ren.getScene(ren.current.scene,ren.current.label);
}


};