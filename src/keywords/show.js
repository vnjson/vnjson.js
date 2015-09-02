ren.keywords["show"] = function(show){
			this.layers.show.style.display = 'block'

			if(typeof(show)==='string'){
				this.layers.show.style.background = 'url('+this.game.images[show]+')';
				
			}
			if(typeof(show)==='object'){
				this.layers.show.style.background = 'url('+this.game.images[show.image]+')';
			}
}