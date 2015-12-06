var ren = {
	game:{},
	i:0,
	//event:{},
	label:"String",
	currentObject:null,
	plugin:{},
	layers:{},
	reg:{},
	images:{},
	audio:{}
};


ren.reg = {
	getImage:function(img){
		var reg = VerEx()
				
				.word()
				.then(".png")
				.endOfLine();

		return img.match(reg)[0].split('.')[0]
		
	},
	getAudio:function(audio){
			var reg = VerEx()
				
				.word()
				.then(".wav")
				.endOfLine();

		return audio.match(reg)[0].split('.')[0]
		
	},
	getLayer:function(layer){
		//show:$('#show')
				//.css('background-image')
					//.replace(/.*\s?url\([\'\"]?/, '')
					//	.replace(/[\'\"]?\).*/, '')
	}
}

ren.loadGame = function(){


$.when(
	$.ajax('game/characters.json5'),
	$.ajax('game/options.json5'),
	$.ajax('game/layers.json5'),
	$.ajax('game/images.json5'),
	$.ajax('game/audio.json5'),
	$.ajax('package.json5')
).then(function(characters,options,layers,images,audio,package){

	ren.game = {
		characters:JSON5.parse(characters[0]),
		options:JSON5.parse(options[0]),
		layers:JSON5.parse(layers[0]),
		images:JSON5.parse(images[0]),
		audio:JSON5.parse(audio[0]),
		package:JSON5.parse(package[0])
	}
		

})

.then(function(){

	ren.imagePreload();
})
.then(function(){
	ren.createLayers(); 
})

.then(function(){
	
	ren.audioLoad();
})
.then(function(){
	ren.concatKeywords(); 
})


.then(function(){
	ren.event.jump(ren.game.options.startLabel)
});

};
ren.createLayers = function(){

this.game.layers.forEach(function(layer){
	$('#'+layer.parent).append('<section id='+layer.id+'></section>')
	$("#"+layer.id).css(layer.style);
	ren.layers[layer.id] = layer.style;

})

	$('#scene').bind("mousedown",function(){
		ren.parse('next');
	});

}
ren.imagePreload = function(){
	
	$.imgpreload(ren.game.images,{
		each:function(){
			var src = $(this).attr('src');
			var imageName = ren.reg.getImage(src);
			ren.images[imageName] = src;
		
		},
		all:function(){
			//console.log("Все изображения загружены")

		}
	})

}
ren.audioLoad = function(){
	
	ren.game.audio.forEach(function(src){
		var audioName = ren.reg.getAudio(src);
			ren.audio[audioName] = src;
	})

}

ren.switch = true;
ren.getScene = function(){
	ren.game.scenes = ren.game.scenes||{};
	$.get("game/scenes/"+ren.label+".json5",function(data){
		
		ren.game.scenes[ren.label] = JSON5.parse(data);

		console.log('ren.switch: ' +ren.switch)
		if(ren.switch){
			
			ren.parse('current');
			ren.switch = false;
		}
		else {
			ren.parse('prev');
			//ren.switch = 'next';
		}

		
	});

}
ren.concatKeywords = function(){
//Склеиваю ключевые слова
this.event = $.extend(ren.event,ren.game.characters,ren.layers,ren.plugin);

}
ren.event = {
	name:function(character){
	
		$('#nameBox')
			.html(character.name+': ')
			.css('color',character.color);

	},
	reply:function(text,character){
		
		$('#dialogBox')
				.html(text)
				.css('color',character.color);
	},
	jump:function(label){
		
			ren.label = label;
			ren.i = 0;
			ren.getScene();
			
	},
	undefined:function(name,value){
		console.error("Обработчик "+ name +" не зарестрирован")
			
	},
	layer:function(id,param){
		
		$('#'+id).css('background','url("'+ren.images[param]+'")');

	},
	audio:function(val){
		if(val in ren.audio){


		var AudioSrc = ren.audio[val];
		
			new Howl({
 					urls: [AudioSrc],
 					loop:true
				}).play();
	}
	
	else{
		console.error('Параметр audio '+val+' не верен')

	}
	},


}


ren.event.menu = function(param){
		

			$('#scene').append('<section id="menu"></section>');
			$.each(param,function(li,label){
				
				
			if(typeof label==='string'){
				$('#menu').append('<li data-label='+label+'>'+li+'</li>')
			}
			else if(typeof label==='object'){
				$('#menu').append('<li data-label='+label.jump+'>'+li+'</li>')
			}

			});
			
			$('#menu').css({
				position:'absolute',
				top:0,
				left:0,
				width:'600px',
				height:'400px',
				background:'rgba(0,0,0,0.7)',
				fontSize:'16pt',
				
			});
			$('#menu li').css({
				background:'red',
				color:'white',
				display:'block'

			});
		
			$('#menu li')
				.mouseover(function(){
					$(this).css('background-color',"rgba(200,0,0,0.7)")
				})
				.mouseout(function(){
					$(this).css('background-color',"red")
				})
				.mousedown(function(){
					
					$('#menu').remove();
					ren.event.jump($(this).attr('data-label'))
				})
	
}
ren.parse = function(param){
		
	//this.iterator(param);
switch(param){
	case 'prev':
		this.i--;
		break;
	case 'current':
		this.i = this.i;
		break;
	case 'next':
		this.i++;
}


	ren.currentObject = ren.game.scenes[ren.label][ren.i];

	console.log(this.i)
	if(ren.currentObject===undefined){
		console.error('Конец сцены i:'+this.i);
	}
	else{
		//Перебираю методы текущего объекта и вызываю
		$.each(this.currentObject,function(key,value){
			func.call(ren,ren.event[key],value,key);
		});
	}
	



	function func(key,value,name){
	

		switch(typeof key){
			case "object":
				if('name' in key){
					this.event["name"].call(this,key);
					this.event["reply"].call(this,value,key)
				}
				//Если это слой*layer
				else{
					this.event["layer"].call(this,name,value)
				}

			break;
			case "function":
				key.call(this,value);
			break;
			case "undefined":
				this.event["undefined"].call(this,name,value);
			break;
		}

		
	}

}


$(document).ready(function($){
	$.ajaxSetup({dataType:'text'});
	ren.loadGame();


});