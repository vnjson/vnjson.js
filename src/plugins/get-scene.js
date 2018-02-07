/**
 conf = /scenes/
*/

vnjs.on('getScene', function(data){
	const { sceneName, labelName, index } = data;
	const { DEBUG, conf } = this;
  let uri = `${conf.gameDir}/${conf.scenesDir}/${conf.local}/${sceneName}.json`;
  fetch(uri)
	.then(r=>r.json())
	.then(sceneBody=>{

		if(DEBUG){
			console.log(sceneName, sceneBody)
			console.log(data);
		}

		vnjs.setScene(sceneName, sceneBody, labelName, index);
	})
/*

setScene("*", sceneBody);

state.label = "mainMenu";

next();
*/

});