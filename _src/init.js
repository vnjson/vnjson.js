import game          from './game';
//import autorun       from './autorun';
//import jump          from './jump';
import ajax          from './utils/ajax';


function init(){




ajax('game/init.json').then((data)=>{

		//autorun();
		game.init = data;
		console.log(data);
		/*
		 * @jump to start Label
		 */
		//jump(data.config.startLabel);
}).catch((err)=>{
  console.log(err);
});

	
};
export default init;
