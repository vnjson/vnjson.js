


vnjs.on('screen', function(id){
	this.emit(id, vnjs.screenList[id]);


 if(vnjs.prevScreen!=""){
 				let pscreen = vnjs.screenList[vnjs.prevScreen];
         $(pscreen).hide();
        
 }

 vnjs.prevScreen = id;
	//prefix
	//show.id
	//hide.pref.screen
	//push.state.screens
vnjs.state.screen = id;
	$(vnjs.screenList[id]).show()//show(vnjs.screenList[id])
});




