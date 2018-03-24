 /*   filter: blur(5px);
  -webkit-filter: blur(5px);*/
vnjs.on('blur', function(data){

  const { target, size, duration } = data;


     let elem = document.querySelector("."+target);
     Object.assign(elem.style, {
        'filter': `blur(${size}px)`,
        '-webkit-filter': `blur(${size}px)`,
        'transition': `${duration}s filter linear`,
        '-webkit-transition': `${duration}s  -webkit-filter linear`
     });

});


vnjs.on('contrast', function(data){
  const { target, size, duration } = data;

  try{
    let elem = document.querySelector("."+target); 
    Object.assign(elem.style, {
      'filter': `contrast(${size})`,
      '-webkit-filter': `contrast(${size})`,
      'transition': `${duration}s filter linear`,
      '-webkit-transition': `${duration}s  -webkit-filter linear`
    });
  }catch(e){

    console.error(`Элемент [ ${target} ] не найден `, e);

  }
});


vnjs.on('grayscale', function(data){
   const { target, size, duration } = data;
  let elem = document.querySelector("."+target);
  try{

  Object.assign(elem.style, {
    'filter': `grayscale(${size})`,
    '-webkit-filter': `grayscale(${size})`,
    'transition': `${duration}s filter linear`,
    '-webkit-transition': `${duration}s  -webkit-filter linear`
  });

  }catch(e){

    console.error(`Элемент [ ${target} ] не найден `, e);

  }
});
