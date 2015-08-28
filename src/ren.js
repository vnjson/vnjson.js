function RenJs (game){
	this.game = game;
	this.i = 0;
	this.label = game.options['startLabel']
	this.images = game.images
		
	function imagePreload(){
		for(var key in this.images){
		var	img = new Image()
			img.src = this.images[key]
					
		}	
	};
	imagePreload.call(this);

	function getScripts(arr){
		function includeJS(src){
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
				script.charset = 'utf-8';
				script.src = src;
				head.appendChild(script);
		}
			arr.forEach(function(uri){
				includeJS(uri);
			});
				
	}
	getScripts(this.game.scripts);
	
	function init(){
		var el = this.game.options.el;
		var _this = this;
			_this.parse();

		$(el).mousedown(function(){
			_this.parse();
		});


	}
	
	init.call(this);
	
	this.memoryCard();
}

