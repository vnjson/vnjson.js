{
	let root = null;
	vnjs.router = new Navigo(root, true, '#!');
};

vnjs.router
  .on(function(){
   // vnjs.parse({screen: 'main-menu'})
  })

  .on('/screen/:id', function(params){
    let { id } = params;
    vnjs.parse({screen: id})
  })
  /* .on('/:scene', function(params){
  	let { scene } = params;
    console.error('Необходимо задать лабел')
   
      vnjs.parse({
            jump: [ scene, label ].join('/')
          })
  })*/
  /* .on('/:scene/:label', function(params){
  	let { scene, label } = params;
   vnjs.parse({
            jump: [ scene, label, 0 ].join('/')
          })
    
  })*/
  .on('/:scene/:label/:index', function (params) {
//router.navigate('/products/list');
    let { scene, label, index } = params;
     /* vnjs.parse({
            jump: [ scene, label, index ].join('/')
          })*/

      vnjs.on('character', data=>{
        let { param , reply } = data;

        console.log(`%c ${param.name}: %c ${reply} `, `color: white;background-color:${param.color};`)
      })    
  })
  .notFound(function(){
  	console.warn('Маршрута не существует')
  })
  .resolve();


