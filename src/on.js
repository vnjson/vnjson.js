
import init             from './init';
import Event            from './Event';
import current          from './current';

function on(event, handler, flag){
	if(event&&handler){
		new Event(event, handler, flag);
	}else{
		init();
	};
	
};


export {
	on,
	current,

};