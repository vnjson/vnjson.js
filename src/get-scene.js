'use strict';
import parse          from './parse';
import catalog        from './catalog';
import game           from './game';
import current        from './current';
import ajax           from './utils/ajax';


function getScene(scene){

const pathToScene = `./game/scenes/${game.init.config.local}/${scene}.json`;

ajax(pathToScene, (data)=>{
		/**
		 * @Set {scene} to {game}
		 */
		game.scenes[scene] = new Object();
		game.scenes[scene] = data;
		/**
 		 * @concat characters whith plugins
		 */

		//put(game.scenes[scene].characters);
		console.log(catalog);
		/**
		 * @parse
		 */
		//  console.log(cat);
		parse();
		document.getElementById('scene')
		.addEventListener('mousedown',function(){
			parse();
		});
});

};

export default getScene;

