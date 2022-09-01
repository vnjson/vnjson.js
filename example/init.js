import vnjs from '../dist/vnjson.js'
window.vnjs = vnjs
/**
 * plugins
 */
import dialogBoxVnjson from './plugins/dialogBoxVnjson.js'
import sceneVnjson from './plugins/sceneVnjson.js'


/**
 * LOAD scenes
 */
fetch(`vn.json`)
    .then((r) => r.json())
    .then((tree) => {
        loader()
        vnjs.mount(tree)
    })
    .catch((err) => {
        console.error("Invalid script", err.message);
    });



function loader (){
    vnjs.on('vnjson.mount', () => {
        // preload assets
        //vnjs.state.assets - assign assets
        vnjs.emit('loader.postload')
    })
}

vnjs.once("loader.postload", function () {
    initPlugins()
    vnjs.exec({ jump: "$root.$init" });
});

function initPlugins (){

    vnjs.use(dialogBoxVnjson)
    vnjs.use(sceneVnjson)


}