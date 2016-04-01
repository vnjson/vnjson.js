vn.event.jump = function(pathname){
console.info("jump: "+pathname);
vn.current.scene =  pathname.split('/')[0];
vn.current.label =  pathname.split('/')[1];
vn.current.Number = 0;
if(vn.game.scenes[vn.current.scene]){
	//console.warn('Сцена уже загружена');
	vn.current.Number =-1;
	vn.current.Array = vn.game.scenes[vn.current.scene][vn.current.label]
}
else{
	/**
	 * load scene resourse 	
	 * @param {string} scene - current scene
	 * @param {string} label - current label
	 */
	
	vn.getScene(vn.current.scene,vn.current.label);
}


};