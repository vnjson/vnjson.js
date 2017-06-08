/* simple scene */
var simpleScene = {
      simpleLabel: [
        { print: 'Hello World' },
        { print: 'action'},
        { jump: 'label2'}
      ],
      label2: [
        { print: 'It is label2'},
        { jump: 'verySimpleScene/entry'}
      ]
};

var verySimpleScene = { 
      entry: [
          { print: 'verySimpleScene', alert: 'redAlert!'},

          ]
};