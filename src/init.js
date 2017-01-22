import game          from './game';
import autorun       from './autorun';
import jump          from './jump';
import ajax          from './utils/ajax';


function init(){




ajax('./game/init.json', (data)=>{
		/**
		 * @start autorun
		 */
		 
		autorun();
		/**
 		 * @game[init.json]
		 */
		game.init = data;
		/*
		 * @jump to start Label
		 */
		

		jump(data.config.startLabel);
});

	
};
export default init;
