RenJs.prototype.keywords['aliase'] = function(aliase){
			var character = this.game.characters[aliase]
			this.layers.name_box.innerHTML = character.name
			this.layers.name_box.style.color = character.color
			this.layers.text_box.style.color = character.textColor
}