
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