
vnjs.on('blur', function(data){
	const { layer, size, duration } = data;
	let el = document.getElementById(layer);


	Object.assign(el.style, {
				'filter': `blur(${size}px)`,
				'-webkit-filter': `blur(${size}px)`,
				'transition': `${duration}s filter linear`,
				'-webkit-transition': `${duration}s  -webkit-filter linear`
	});
});

