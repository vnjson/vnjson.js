{
	let root = null;
	vnjs.router = new Navigo(root, true, '#!');
};

vnjs.router
  .on(function(){
    console.info('############ vnjson.js #############');
    vnjs.parse({screen: 'main-menu'})
  })
  .on('/about', function(){
    vnjs.parse({screen: 'about'})
  })
  .on('/settings', function(){
    vnjs.parse({screen: 'settings'})
  })

  .on('/game/:scene', function(params){
  	let { scene } = params;
    console.warn([scene].join('|'))
  })
  .on('/game/:scene/:label', function(params){
  	let { scene, label } = params;
    console.warn([scene,label].join('|'))
  })
  .on('/game/:scene/:label/:index', function (params) {
//router.navigate('/products/list');
    let { scene, label, index } = params;
    console.warn([scene,label, index].join('|'))
  })
  .notFound(function(){
  	console.warn('Маршрута не существует')
  })
  .resolve();


