{
	let root = null;
	vnjs.router = new Navigo(root, true, '#!');
};

vnjs.router
  .on(()=>console.log('############ vnjson.js #############'))

  .on('/:scene', function(params){
  	let { scene } = params;
    console.warn([scene].join('|'))
  })
  .on('/:scene/:label', function(params){
  	let { scene, label } = params;
    console.warn([scene,label].join('|'))
  })
  .on('/:scene/:label/:index', function (params) {
//router.navigate('/products/list');
    let { scene, label, index } = params;
    console.warn([scene,label, index].join('|'))
  })
  .notFound(function(){
  	console.warn('Маршрута не существует')
  })
  .resolve();


