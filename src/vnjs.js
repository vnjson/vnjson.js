import Vnjson from "./Vnjson.js";
/**
 * native plugins
 */
import log from "./plugins/log.js";
import jump from "./plugins/jump.js";
import append from "./plugins/append.js";
import timeout from "./plugins/timeout.js";
import next from "./plugins/next.js";

const vnjs = new Vnjson();

/**
 * init plugins
 */
vnjs.on("log", log);
vnjs.on("jump", jump);
vnjs.on("+", append);
vnjs.on("timeout", timeout);
vnjs.on("next", next);


export default vnjs;
