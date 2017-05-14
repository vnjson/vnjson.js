//create a console.log reporter
var MyReporter = function(){jasmineRequire.JsApiReporter.apply(this,arguments);};
MyReporter.prototype = jasmineRequire.JsApiReporter.prototype;
MyReporter.prototype.constructor = MyReporter;
MyReporter.prototype.specDone=function(o){
    o=o||{};
    if(o.status!=="passed"){
      console.error( o.fullName /*+ o.failedExpectations[0].message*/);
    }
};
var env = jasmine.getEnv();
env.addReporter(new MyReporter());



describe("setScene", function() {
    let sceneName = "scene/label";

  it('sceneName является строкой', ()=>{
    expect(typeof sceneName).toBe('string');
  }); 
 /* it('sceneName является не должно быть логическим значением', ()=>{
    expect(sceneName).toEqual(jasmine.any(Boolean))
  });*/ 
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
   
    expect(vnjs.setScene(sceneName, sceneObject)).toBe(true);

  });
 
});





describe("setLabel", ()=>{

const labelName = "label";
const labelArray = [{}, {}, {}];

  it('Имя метки должно быть строкой', ()=>{
    expect(labelName).toEqual(jasmine.any(String));
  });

  it('Проверка на работоспособность', ()=>{
    expect(vnjs.setLabel(labelName, labelArray)).toEqual(jasmine.any(Boolean))
  });
  it('Втотой аргумент функции должен быть массивом', ()=>{
    expect(labelArray).toEqual(jasmine.any(Array));
  });  
  it('setLabel должно быть функцией', ()=>{
    expect(vnjs.setLabel).toEqual(jasmine.any(Function));
  });
})