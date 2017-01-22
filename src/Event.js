import catalog                from './catalog';

class Event {
	constructor(event, handler, flag){
		this.event = event;
		this.handler = handler;
		this.flag = flag;
		this.pushToCatalog();
	}
	pushToCatalog(){
		const _event = {
			event: this.event,
			handler: this.handler,
			autorun: this.flag
		};
		Object.assign(catalog, _event);

	}
}


export default Event;