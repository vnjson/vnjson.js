/*
 * Так же потом сделать удаленные сохраненки на
 * vnjson.online
 */

export function save(data){
  localforage.setItem(data.title, data, (err)=>{
    if(err){
      console.log(err);
    }
    console.log('Игра сохранена');

  });
};

export function load(key){
   localforage.getItem(key).then((data)=>{
      console.log(data);
   }).catch(function (err) {
        console.error(err);
   });
}

export default {
  save, load
}