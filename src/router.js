ren.route = function(){

location.hash = [
					'#!',
					ren.current.scene,
					ren.current.label,
					ren.current.Number
				].join('/');

};//ren.route()