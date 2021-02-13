

function menu(menu){

menuItemEl.innerHTML = "";
menuEl.style.display = "block";

	for(let [menuItem, label] of Object.entries(menu)){
		
		if(menuItem==='?'){
			dialogBox.innerHTML = label;
		}else{

			let strmenu = `<div data-label="${ label }" class="menu-item">${menuItem}</div>`;
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

