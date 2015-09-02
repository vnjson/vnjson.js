ren.memoryCard = function(){
	var aside = document.getElementsByTagName('aside')[0];
	this.button.save = document.createElement('button');
	this.button.save.innerHTML = 'save';
	aside.appendChild(this.button.save);
	this.button.save.addEventListener('mousedown',function(){
			store.set('kasin',{
				i:ren.i,
				label:ren.label,
			});
			alert('Сохранено')
	})




		//_this.layers.scene.style.backgroundImage = 'url('+kserks.scene+')';
		//_this.layers.show.style.backgroundImage = 'url('+kserks.show+')';
		


	var aside = document.getElementsByTagName('aside')[0];
	this.button.load = document.createElement('button');
	this.button.load.innerHTML = 'load';
	aside.appendChild(this.button.load);

	this.button.load.addEventListener('mousedown',function(){

		var kserks = store.get('kasin');
		ren.label = kserks.label;
		ren.i = kserks.i;
		ren.parse('current');
	})

				//show:$('#show')
				//.css('background-image')
					//.replace(/.*\s?url\([\'\"]?/, '')
					//	.replace(/[\'\"]?\).*/, '')
}