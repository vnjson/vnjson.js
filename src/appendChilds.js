ren.appendChilds = function(){
		var body = document.getElementsByTagName('body')[0];
			body.style.backgroundColor = '#263238';
			body.style.overflow = 'hidden';

//background-clip:

		this.layers['scene'] = document.createElement('section');
		this.layers['scene'].id = 'scene';
		this.layers['scene'].style.cssText = "user-select:none;-moz-user-select:none;-webkit-user-select:none;";
		this.layers['scene'].style.position = 'relative';
		this.layers['scene'].style.width = '600px';
		this.layers['scene'].style.height = '400px';
		this.layers['scene'].style.top = '0px';
		this.layers['scene'].style.left = '0px';
		this.layers['scene'].style.border = '1px solid grey';
		this.layers['scene'].style.cursor = 'pointer';

		document.querySelector(this.game.options.elem)
			.appendChild(this.layers.scene)

		this.layers['show'] = document.createElement('section');
		this.layers['show'].id = 'show';
		this.layers['show'].style.position = 'absolute';
		this.layers['show'].style.width = '150px';
		this.layers['show'].style.height = '300px';
		this.layers['show'].style.top = '30px';
		this.layers['show'].style.left = '225px';
		this.layers['show'].style.display = 'none';
		document.getElementById('scene')
			.appendChild(this.layers.show);

		this.layers['nameBox'] = document.createElement('section');
		this.layers['nameBox'].id = 'name_box';
		this.layers['nameBox'].style.position = 'relative';
		this.layers['nameBox'].style.width = '100px';
		this.layers['nameBox'].style.height = '30px';
		this.layers['nameBox'].style.top = '265px';
		this.layers['nameBox'].style.left = '0px';
		this.layers['nameBox'].style.fontSize = '14pt';
		this.layers['nameBox'].style.color = '#999';
		this.layers['nameBox'].style.backgroundColor = 'rgba(0,0,0,0.7)';
		document.getElementById('scene')
			.appendChild(this.layers.nameBox);


		this.layers['dialogBox'] = document.createElement('section');
		this.layers['dialogBox'].id = 'dialog_box';
		this.layers['dialogBox'].style.position = 'relative';
		this.layers['dialogBox'].style.width = '600px';
		this.layers['dialogBox'].style.height = '100px';
		this.layers['dialogBox'].style.top = '270px';
		this.layers['dialogBox'].style.left = '0px';
		this.layers['dialogBox'].style.fontSize = '14pt';
		this.layers['dialogBox'].style.color = '#999';
		this.layers['dialogBox'].style.backgroundColor = 'rgba(0,0,0,0.7)';
		document.getElementById('scene')
			.appendChild(this.layers.dialogBox);

		this.layers['textBox'] = document.createElement('section');
		this.layers['textBox'].id = 'text_box';
		this.layers['textBox'].style.position = 'relative';
		this.layers['textBox'].style.width = '580px';
		this.layers['textBox'].style.height = '100px';

		document.getElementById('dialog_box')
			.appendChild(this.layers.textBox);
		/*
		var wrapper = document.createElement('section');
		wrapper.id = 'wrapper';
		wrapper.style.position = 'absolute';
		wrapper.style.top = '5px';
		wrapper.style.left = '5px';
		wrapper.style.width = '600px';
		wrapper.style.height = '400px';
		// rect( top right bottom left )
		//wrapper.style.cssText ='clip: rect(0px, 600px, 400px, 0px)';
		document.getElementsByTagName('body')[0]
			.appendChild(wrapper);
			*/

		var aside = document.createElement('aside');
			document.body.appendChild(aside);



		this.button['prev'] = document.createElement('button');
		this.button['prev'].id = 'prev';
		this.button['prev'].innerHTML = 'prev';	
		aside.appendChild(this.button['prev']);

		this.button['next'] = document.createElement('button');
		this.button['next'].id = 'next';
		this.button['next'].innerHTML = 'next';
		aside.appendChild(this.button['next']);
}
