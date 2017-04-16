import jump           from './jump';


export default {
		jump,

};

new Event('scene',function (data){
		console.log('scene: '+data);
});

new Event('left',function (data){
		console.log('left: '+data);
});


new Event('right',function (data){
		console.log('right: '+data);
});

new Event('center',function (data){
		console.log('center: '+data);
});

new Event('audio',function (data){
		console.log('audio: '+data);
});