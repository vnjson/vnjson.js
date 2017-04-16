export default (character, reply)=>{
  let nameBox = document.getElementById('name_box');
  let textBox = document.getElementById('text_box');
  nameBox.innerHTML = character.name;
  nameBox.style.color = character.color;
  textBox.innerHTML = reply;
    
};