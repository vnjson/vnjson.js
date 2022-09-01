/**
 * jump: scene.label        # jump between scenes
 * jump: label              # jump inside the scene
 * jump: scene.label.7      # jump to index position
 * jump: _mark_1            # jump to a point inside the label
 */
export default function (_pathname) {
    const pathname = String(_pathname);
    /**
     * Обработка прыжка по менткам _mark
     */
    if (/^_/i.test(pathname)) {
        const labelBody = this.getCurrentLabelBody();
        if (labelBody.length === 0) return;
        const index = labelBody
            .map((ctx) => {
                return ctx.hasOwnProperty(pathname);
            })
            .indexOf(true);

        const label = [this.state.sceneName, this.state.labelName, index].join(
            "."
        );

        this.exec({ jump: label });
    } else {
        const path = pathname.split(".");
        this.state.index = path[2] || 0;
        //label
        if (!/\./i.test(pathname)) {
            this.state.labelName = path[0];
            this.emit("jump.init", false);
            this.exec();
        }
        //scene.label
        if (/\./i.test(pathname)) {
            this.state.sceneName = path[0];
            this.state.labelName = path[1];
            this.emit("jump.init", true);
            this.exec();
        }
    }
}
