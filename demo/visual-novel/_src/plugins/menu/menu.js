

function gameMenu(menu){
	vue.$data.screen = "gamemenu";
	setTimeout(drawMenu, 0);

function drawMenu(){

vnjs.$.menu_items.innerHTML = "";
	for(let [menuItem, label] of Object.entries(menu)){
		
		if(menuItem==='?'){
			vnjs.$.menu_quetion.innerHTML = label;
		}else{

			let strmenu = `<div data-label="${ label }" class="menu-item">${menuItem}</div>`;
			vnjs.$.menu_items.innerHTML +=strmenu;
		}
	};

	}



}