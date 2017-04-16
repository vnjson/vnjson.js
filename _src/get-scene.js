
//import parse          from './parse';
//import catalog        from './catalog';
import game           from './game';
import ctx            from './ctx';
import ajax           from './utils/ajax';


function getScene(scene){

const pathToScene = `./game/scenes/${game.init.config.local}/${scene}.json`;
/*
ajax(pathToScene)
	.then((data)=>{

		game.scenes[scene] = new Object();
		game.scenes[scene] = data;

		console.dir(game);
		document.getElementById('scene')
		.addEventListener('mousedown',function(){
			//parse();
		});
	});
*/
console.log(scene);
};

export default getScene;

