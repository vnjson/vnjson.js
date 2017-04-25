
vnjs.on('grayscale', function(data){
	const { image, size, duration } = data;
	let el = document.getElementById(image);

	Object.assign(el.style, {
		'filter': `grayscale(${size})`,
		'-webkit-filter': `grayscale(${size})`,
		'transition': `${duration}s filter linear`,
		'-webkit-transition': `${duration}s  -webkit-filter linear`
	});
});
