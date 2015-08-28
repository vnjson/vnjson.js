RenJs.prototype.keywords = {

		jump:function(jump){
			this.label = jump;
			this.i = 0
		},
		audio:function(audio){
			var AudioSrc = this.game.audio[audio]
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
		},
		sound:function(sound){
			var SoundSrc = this.game.audio[sound]
			new Howl({
 				urls: [SoundSrc],
 				loop:false
			}).play();
		},
		
}