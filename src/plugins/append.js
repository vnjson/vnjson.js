
/**
 * - +: Append chunk to phrase
 */
export default function (reply) {
              
    if(!this.state.character) {
        this.state.character = this.tree.$root.characters[0]
    } 
    this.emit("vnjson.character", this.state.character, reply, true);
}