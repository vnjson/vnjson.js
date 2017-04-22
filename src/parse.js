  /*
   * Модуль отвечающий за смену состояния визуальной новеллы
   * Отвечает за проход массива [ label ]  
   * Так же делегирует выполнение параметров текущего объекта
   * обработчикам [ event ]
   *
   */

/*
 * @plugin
 * vnjs.alias
 */

function tokenize(ctx, catalog){
/*
 *  Фильтруем параметры текущего объекта и проверяем наличие их
 *  реестре событий [ catalog ], если есть совпадения то выполняем их.
 *
 */
  for(let key in ctx.obj){
    catalog.forEach((item)=>{
      /*
       * Если ключ объекта совподает с зарегистрированным 
       * алиасом персонажа, то выполняем модуль alias
       * Т.е. определяем персонаж ли это.
       */
      if(item.hasOwnProperty('alias')){
          if(item.alias===key){
              let reply = ctx.obj[item.alias]; 
              vnjs.alias(item, reply);
          }
      }
      /*
       * Если это функция, то выполняем ее
       */
      else if(item.hasOwnProperty('event')){
       
            if(item.event===key){
              item.handler(ctx.obj[key], key);
            }

      }
      /*
       * Элемент отсутсвует в реестре событий [catalog]
       */
      else{
         console.log('неизвесный элемент: '+ key);
      }   
    });//catalog.forEach
  }//for

};

function parse(ctx, catalog){
  console.log(`${ctx.scene}/${ctx.label}/${ctx.num}`);
  /** Текущий объект */
  ctx.obj = ctx.arr[ctx.num];

  tokenize(ctx, catalog);
  ctx.num+=1;
}

export default parse;