import vnjs from "../../dist/vnjson.js";
/**
 * setup
 */
export default function (tree) {
    /**
     * @ postload
     */
}

/**
 * reply handler
 */
const dialogBoxNode = document.querySelector(".dialog-box");
const nameNode = document.querySelector(".dialog-box__name");
const replyNode = document.querySelector(".dialog-box__reply");

vnjs.on("vnjson.character", (character, reply, append) => {
    nameNode.innerHTML = character.name;
    nameNode.style.color = character.nameColor;
    replyNode.style.color = character.replyColor;
    if (append) {
        replyNode.innerHTML += " "+ reply;
    } else {
        replyNode.innerHTML = reply;
    }
});


dialogBoxNode.addEventListener('mousedown', () => {
    vnjs.next();
})