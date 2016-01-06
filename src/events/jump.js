ren.event.jump = function(pathname){

ren.current.scene =  pathname.split('/')[0];
ren.current.label =  pathname.split('/')[1];
ren.current.Number = 0;
if(ren.game.scenes[ren.current.scene]){
	console.warn('Сцена уже загружена');
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