


```js

vnjs.on('character', function(data){

    $('.dialog-box').html(data.text);
    $('.name-box')
          .html(data.name)
          .css({
              color: 'white',
              backgroundColor: data.color
            })
})

vnjs.on('jd', function(text){
  let data = {
        name: "John Doe",
        age: "19",
        text: text,
        color: 'blue'
  }
  this.emit('character', data)
});


vnjs.on('al', (text)=>{
  let data = {
        name: 'Alice',
        age: 14,
        text,
        color: 'red'
  };
  vnjs.emit('character', data);

})


vnjs.parse({
        jd: "Hello <b>world!</b>"
  });

vnjs.parse('al: Hello world2')

```