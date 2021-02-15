

function menu(menu){

menuItemEl.innerHTML = "";
menuEl.style.display = "block";

	for(var [label, menuItem ] of Object.entries(menu)){
		
		if(label==='?'){
			dialogBox.innerHTML = menuItem;
		}else{

			let strmenu = `<div data-label="${ label }" class="menu-item">${ menuItem }</div>`;
			menuItemEl.innerHTML +=strmenu;
		}
	}
/*********/
function handlerEvent(e){
	/**
	 * Обработчик каждый раз навешивается
	 * понял
	 */
	menuEl.style.display = "none";
	vnjs.exec({'jump': e.target.dataset.label});
	menuEl.removeEventListener('mousedown', handlerEvent, false)

};
menuEl.addEventListener('mousedown', handlerEvent);


};

