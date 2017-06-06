/*describe("setScened", function() {

  let sceneName = "scene/label";
  it('Имя сцены не должно содержать пробелов',()=>{
    expect(sceneName).not.toMatch(' ');
  });

});*/

describe('ooo', function(){
  it('1223',function(){
    expect(true).toBe(true);
  })
})
 /* it('sceneName является не должно быть логическим значением', ()=>{
    expect(sceneName).toEqual(jasmine.any(Boolean))
  });*/ /*
  it('Имя сцены не должно содержать пробелов',()=>{
    expect(sceneName).not.toMatch(' ');
  });
  it('Название сцены не должно содержать символов в Верхнем регистре', ()=>{
    
    expect(sceneName).not.toMatch('[A-Z]');

  })  

   let sceneObject = {
        labels: {},
        characters: {},
        assets: [{}]
    };  
  it('Параметр sceneObject должен быть объектом', ()=>{
    expect(typeof sceneObject).toBe('object');
  });
  it('Свойство labels должно быть объектом',()=>{
    expect(typeof sceneObject.labels).toBe('object');
  });
  it('Свойство characters должно быть объектом',()=>{
    expect(typeof sceneObject.characters).toBe('object');
  });
  it('Свойство assets должно быть массивом',()=>{
    expect(sceneObject.assets).toEqual(jasmine.any(Array))
  });
  it('setScene должно быть функцией', ()=>{
    expect(vnjs.setScene).toEqual(jasmine.any(Function));
  })
  it("Метод setScene должен вернуть true", () =>{
   
    expect(vnjs.setScene(sceneName, sceneObject)).toBe(vnjs);

  });
 
});
