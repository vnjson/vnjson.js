ren.keywords['menu'] = function(menu){
	/*
			var menuLi = []
			var _this = this;

			$('#scene').append('<div id="menu"></div>')
			$('#menu').css({
				width:600,
				height:400,
				backgroundColor:'rgba(0,0,0,0.7)',
				position:'absolute',
				top:0,
				left:0
			})
				for(var key in menu){
						menuLi.push(key)
						//console.log(key+': '+menu[key])
						$('#menu').append('<li data-label="'+menu[key]+'">'+key+'</li>')
				}
				$('#menu li').css({
					backgroundColor:'rgba(0,0,100,0.8)',
					color:'#999'
				})

				function callback(){
					
					_this.label = $(this).attr('data-label')
					_this.i = 0;
					//_this.parse()
					$('#menu').remove()
				}
				$('#menu').delegate('li','mousedown',callback)
	
				/*-- Отсюда могу кликать по нижнему слою и новелла идет дальше..*/
}