
import init             from './init';
import Event            from './Event';
import ctx              from './ctx';

function on(event, handler, flag){
	if(event&&handler){
		//new Event(event, handler, flag);
    console.log(event);
	}else{
		init();
	};
	
};


export {
	on,
	ctx,
  init
};