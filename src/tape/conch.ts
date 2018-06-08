// =========================== //
// Tape conch.js
// =========================== //
module Tape {
    
    export const isConchApp = (): boolean => {
        return window.hasOwnProperty('conch');
    };

    /**
     * ConchHandler
     */
    export class ConchHandler {

        /**
         * 初始化
         * @param width 宽度
         * @param height 高度
         * @param options 其他拓展
         */
        public static init = (width: number, height: number, ...options) => {
            Laya.init(width, height, ...options);
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        };

        public static exit = () => {
            if (isConchApp() && window["conch"].hasOwnProperty("exit")) {
                window["conch"].exit();
            }
        };

    }

}