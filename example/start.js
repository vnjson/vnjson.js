var start = {
        characters: {
              pr: { name: "Профессор", color: 'grey' },
              al: { name: 'Алиса', color: 'grey' }
        },
        assets: [
                  {
                    size: '147kb',
                    extname: '.png',
                    name: 'background'
                  }
                ],
        labels: {},
};


start.labels['start'] = [
  { pr: "hello kasin"},
  { log: "_world!"},
  { log: "this is"},
  { log: 'my simple', warn: "Предупреждение"},
  { pr: 'visual novel!'},
  { log: 'Привет мир'},
  { jump: 'chapter1'}
];


start.labels['chapter1'] = [
  { al: "И вам профессор не хворать" },
  { log: 'Тестирую сцены' },
  { jump: 'gameover'}

];

start.labels['gameover'] = [
  {log: 'gameover'},
  {jump: 'lab/start'}

];