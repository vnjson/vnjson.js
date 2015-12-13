/*ren.event.menu = function(param){
		

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
	
}*/