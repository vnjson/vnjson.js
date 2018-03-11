vnjs.on('getScreens', function(){

const { conf, DEBUG, emit } = this;

function fetchCss(filename) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = filename
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(l);
};



	
	let uriHtml = `${conf.gameDir}/screens.html`;
	let uriCss = `${conf.gameDir}/screens.css`;
	let gameRoot = document.querySelector(conf.element);
	fetch(uriHtml)
		.then(r=>r.text())
		
		.then(screens=>{
			fetchCss(uriCss);
			gameRoot.innerHTML = screens;
		})
		.then(()=>{
			let screensNodeList = document.querySelectorAll(conf.screenClass);
            screensNodeList.forEach((screen)=>{

             let styles = {
                    display: 'none',
                    width: '100%',
                    height: '100%'
                  };
             Object.assign(screen.style, styles);

             /*Код кантораЮ необходимо для работы 'Правильлного show/hide'*/
			screen.setAttribute("displayOld", screen.style.display)
             

            vnjs.screenList[screen.id] = screen;
            
         //   DEBUG&&console.log(screen);
            
            });

          emit('screensLoaded')
		})
		//.catch(function(error) { console.error(error); })
		
})