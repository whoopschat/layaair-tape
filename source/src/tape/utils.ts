// utils
module Tape {

    /**
     * Logger
     */
    export class Logger {

        private static __is_debug__: Boolean = true;

        public static setDebug(debug: Boolean): void {
            this.__is_debug__ = debug;
        }

        public static isDebug(): Boolean {
            return this.__is_debug__;
        }

        public static log(message?: any, ...optionalParams: any[]): void {
            if (!this.isDebug()) {
                return;
            }
            console.log(message, ...optionalParams);
        }

        public static error(message?: any, ...optionalParams: any[]): void {
            if (!this.isDebug()) {
                return;
            }
            console.error(message, ...optionalParams);
        }

        public static info(message?: any, ...optionalParams: any[]): void {
            if (!this.isDebug()) {
                return;
            }
            console.info(message, ...optionalParams);
        }

        public static warn(message?: any, ...optionalParams: any[]): void {
            if (!this.isDebug()) {
                return;
            }
            console.warn(message, ...optionalParams);
        }

        public static debug(message?: any, ...optionalParams: any[]): void {
            if (!this.isDebug()) {
                return;
            }
            console.debug(message, ...optionalParams);
        }
    }

    /**
     * Toast
     */
    export class Toast {

        private static __toast_object__: Object = {};

        public static show(type: string, view, duration: number = 500, widthRatio = 0.5, heightRatio = 0.618): void {
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                const list = this.__toast_object__[type];
                view.x = Tape.Box.width() * widthRatio;
                view.y = Tape.Box.height() * heightRatio;
                view.alpha = 0;
                view.pivot(view.width / 2, view.height / 2);
                Tape.Box.tweenTo(view, { alpha: 1 }, duration, Tape.Box.Ease.quintOut);
                Tape.Box.tweenTo(view, { alpha: 0 }, duration, Tape.Box.Ease.quintIn, () => {
                    list.splice(list.indexOf(view), 1);
                    view.removeSelf();
                }, duration);
                Tape.Box.drawView(view);
                for (var i in list) {
                    if (list[i]) {
                        list[i].y -= list[i].height - 5;
                    }
                }
                list.push(view);
            }
        }

    }
}
