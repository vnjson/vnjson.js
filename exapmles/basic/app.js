

const vnjs = new Vnjson();
	  


vnjs.on('*', function (e){
	if(e!=='parse'){
		consoel.error(`Плагин { ${e} } не зарегистрирован`)
	}
	
})
/**
 * plugins
 */

vnjs.on('print', (text)=>{
	console.log(text)

});

vnjs.on('character', (character, reply)=>{

	console.log(`${character.name}: ${reply}`);

});




const sceneBody = {

		characters: [ 
			{ id: "s", name: "Сергей" }
		],
		assets: [
		 // { id:"", path: ""} 
		],
		label_1: [
			"Привет мир! Я сегодня перепиливаю проект на гитхабе",
			"Чтобы потом не удивляться, когда на пол дня там зависну",
			{ s: "Поэтому я занят этим сейчас" },
			{ jump: "label_2"}
		],
		label_2: [
			"this is label n2"
		]

}


vnjs.setScene(sceneBody);

vnjs.start('label_1');


window.setInterval( function(){
	vnjs.next();
}, 1000)