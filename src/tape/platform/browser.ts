module Tape {

    /** BrowserHandler  */
    export module BrowserHandler {

        export const init = (width: number, height: number, ...options) => {
            Laya.init(width, height, ...options);
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        }

        export const exit = () => {
        }

    }

}