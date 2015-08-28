RenJs.prototype.memoryCard = function(){
	var _this = this;
	$('#save').click(function(){
		store.set('kasin',{
			i:_this.i,
			label:_this.label,
			scene:$('#scene')
				.css('background-image')
					.replace(/.*\s?url\([\'\"]?/, '')
						.replace(/[\'\"]?\).*/, ''),
			show:$('#show')
				.css('background-image')
					.replace(/.*\s?url\([\'\"]?/, '')
						.replace(/[\'\"]?\).*/, '')
		});
		alert('Сохранено')
	});

	$('#load').click(function(){
	var kserks = store.get('kasin');
		_this.label = kserks.label;
		_this.i = kserks.i;
		_this.i -=1;
		_this.parse();

		_this.layers.scene.style.backgroundImage = 'url('+kserks.scene+')';
		_this.layers.show.style.backgroundImage = 'url('+kserks.show+')';
		$('#menu').hide();
	});
	
	// .todo
	/*
		Сохранять так же слои dialog_box
		audio  и прочие элементы на сцене в текущей позиции.
	*/
}