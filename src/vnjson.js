import knot from "./knot.js";

const emitter = knot();

class Vnjson {
    version = "2.0.0";
    ctx = null;
    tree = null;
    package = null;
    debug = false;
    conf = null;
    events = emitter.events;
    plugins = {};
    store = {};
    state = {
        index: 0,
        labelName: "",
        sceneName: "",
        character: null,
        data: {
            score: null,
        },
        tree: [],
        assets: [],
    };
    on = emitter.on;
    once = emitter.once;
    emit = emitter.emit;
    off = emitter.off;
    constructor() {}
    getAssetByName(name) {
        const asset = this.state.assets.find((asset) => {
            return asset.name === name;
        });
        if (asset) {
            return asset;
        } else {
            this.emit("error", "assetNotFound", name);
            return { url: name };
        }
    }
    getDataByName(id) {
        const scenesBody = Object.values(this.tree);
        let data = null;
        scenesBody.forEach((body) => {
            if (body.data) {
                if (body.data.hasOwnProperty(id)) {
                    data = { id, body: decodeURI(atob(body.data[id])) };
                }
            }
        });
        return data;
    }
    isSceneExist(sceneName) {
        if (this.tree[sceneName]) {
            return true;
        }
        return false;
    }
    isLabelExist(sceneName, labelName) {
        if (this.isSceneExist(sceneName) && this.tree[sceneName][labelName]) {
            return true;
        }
        return false;
    }
    isRouteExist(pathname) {
        const route = pathname.split(".");
        if (route.length === 1) {
            return this.isSceneExist(this.state.sceneName, route[0]);
        }
        if (route.length > 1) {
            return this.isLabelExist(route[0], route[1]);
        }
    }
    getCurrentLabelBody() {
        try {
            const labelBody =
                this.tree[this.state.sceneName][this.state.labelName];
            return labelBody;
        } catch (err) {
            this.emit("error", "menuOrJumpLeadsNowhere");
            return [""];
        }
    }
    getCurrentCharacter() {
        return this.state.character;
    }
    getCharacterById(id) {
        return this.tree.$root.characters.find(
            (character) => character.id === id
        );
    }
    getCharacters() {
        return this.tree.$root.characters;
    }

    getCtx() {
        return this.getCurrentLabelBody()[this.state.index];
    }
    mount(tree) {
        this.tree = tree;
        this.package = this.tree.$root.package;
        if (!this.tree.$root.hasOwnProperty("characters")) {
            const narrator = {
                id: "$",
                name: ". . . .",
                nameColor: "#49de58",
                replyColor: "#a4deaa",
            };
            if (this.conf.$) {
                narrator = this.conf.$;
            }
            this.tree.$root.characters = [narrator];
        }

        this.tree.$root.characters.map((character) => {
            /**
             * Навешиваем слушатель на id персонажа
             *
             */
            this.on(character.id, (reply) => {
                this.state.character = character;
                this.emit("vnjson.character", character, reply);
            });
        });

        this.emit("vnjson.mount");
    }
    exec(ctx) {
        //Получаем текущий объект контекста
        this.ctx = ctx || this.getCtx();
        if (typeof this.ctx === "string") {
            this.emit("$", this.ctx);
            this.emit("exec", this.ctx);
        }
        // $: null | $: false
        else if (!this.ctx) {
            this.emit("$", String(this.ctx));
            this.emit("exec", String(this.ctx));
        } else if (typeof this.ctx === "object") {
            /**
             * Преобразуем объект контекста [this.ctx] в массив
             * [ ['key', 'value'], ['key2','value2']]
             * Пробегаемся по этому массиву, и записываем
             * ключ-значение в переменные [ event, data ]
             */
            for (let [event, data] of Object.entries(this.ctx)) {
                /**
                 * Вызываем плагины с соответсвующими именами ключей
                 */
                if (!/^_/i.test(event)) {
                    this.emit(event, data);
                }
            }
        } else {
            this.emit("$", String(this.ctx));
        }
        this.emit("vnjson.exec", this.ctx);
    }

    next() {
        if (this.getCurrentLabelBody().length - 2 < this.state.index) {
            this.state.index = this.state.index;
            this.emit("warn", `NoWayOutOfTheLabel`);
        } else {
            this.state.index++;
            this.exec();
            this.emit("vnjson.next");
        }
    }

    use(plugin) {
        if (typeof plugin === "object") {
            plugin.mount();
            return;
        }
        plugin.call(this, this.tree);
    }
}

export default Vnjson;
