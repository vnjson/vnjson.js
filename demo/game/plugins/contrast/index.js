
vnjs.on('contrast', function(data){
	const { image, size, duration } = data;
	let el = document.getElementById(image);

	Object.assign(el.style, {
		'filter': `contrast(${size})`,
		'-webkit-filter': `contrast(${size})`,
		'transition': `${duration}s filter linear`,
		'-webkit-transition': `${duration}s  -webkit-filter linear`
	});
});
