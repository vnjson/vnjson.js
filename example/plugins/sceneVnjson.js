import vnjs from "../../dist/vnjson.js";
/**
 * setup
 */
export default function (tree) {
    /**
     * @ postload
     */
}

const screen = document.querySelector(".screen");

vnjs.on("scene", (name) => {
    if(name){
        eventHanlder(name);
    } else{
        screen.style['background-image'] = "unset"
    }
});


function eventHanlder (name){
    const assetImg = vnjs.tree.$root.assets.find((asset) => {
        return asset.name === name;
    });

    const style = {
        "background-image": `url(${assetImg.url})`,
        "background-position": "100%",
        "background-repeat": "no-repeat",
    };
    Object.assign(screen.style, style);
}