vn.route = function(){

location.hash = [
					'#!',
					vn.current.scene,
					vn.current.label,
					vn.current.Number
				].join('/');

};//vn.route()