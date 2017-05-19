const scene = {
        characters: {
              pr: { name: "Профессор", color: 'grey' },
              al: { name: 'Алиса', color: 'grey' }
        },
        assets: [{}, {}, {}],
        labels: {},
};


scene.labels['start'] = [
  { pr: "hello kasin"},
  { log: "_world!"},
  { log: "this is"},
  { log: 'my simple', warn: "Предупреждение"},
  { pr: 'visual novel!'},
  { alert: 'Привет мир'},
  { jump: 'chapter1'}
];


scene.labels['chapter1'] = [
  { al: "И вам профессор не хворать" },
  { log: 'Тестирую сцены' },
  { jump: 'gameover'}

];

scene.labels['gameover'] = [
  {log: 'gameover'},
  {jump: 'lab/start'}

];