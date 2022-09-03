export default function (){}

vnjs.on('vnjson.error', (code, event) => {
    console.error(code, event)
})

vnjs.on("vnjson.exec", (ctx) => {
    if (!ctx) return;
    if (typeof ctx === "object") {
        Object.keys(ctx).forEach((event) => {
            const isMark = /^_/gi.test(event); // jump: _mark_1
            if (!isMark&&!this.events.hasOwnProperty(event)) {
                vnjs.emit("vnjson.error", "pluginNotFound", event);
            }
        });
    }
});