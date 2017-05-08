
describe("setScene()", function() {
  it("Функция должна вернуть истину", function() {
    expect(vnjs.setScene()).toBe(true);

  });
  it('Значение не должно быть undefined',()=>{
    expect(vnjs.setScene().not.toBe(false));
  });
});


describe('plugin alias', ()=>{
  it('Плагин должен вернуть объект персонажа', ()=>{
    expect(vnjs.plugin.alias({character:{}, reply}));
  });
});
