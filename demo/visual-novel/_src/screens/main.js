//import gsap from './lib/gsap.min.js';
/*
 * screens
 */
import settings from './settings.vue'
import about from './about.vue';
import mCard from './m-card.vue';
import mainMenu from './main-menu.vue';
import stream from './stream.vue';
import gamemenu from './gamemenu.vue';
import preload from './preload.vue';
/*
 * chunks
 */
import btnReturn from './chunks/btn-return.vue';
import topBarMenu from './chunks/top-bar-menu.vue'

Vue.component('btn-return', btnReturn);
Vue.component('top-bar-menu', topBarMenu);

var vue = new Vue({
	el: '#screens',
	data (){
		return {
			screen: 'main-menu'
		}
	},
	components: {
		stream,
		gamemenu,
		about,
		settings,
		mainMenu,
		mCard,
		preload
	}

	
});

window.vue = vue;