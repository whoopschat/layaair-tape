// =========================== //
// tape utils.js
// =========================== //
module Tape {

    ///////////////////////////////////////////////////
    ///// GUID
    ///////////////////////////////////////////////////

    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    export const guid = function () {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    ///////////////////////////////////////////////////
    ///// Logger
    ///////////////////////////////////////////////////

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

    ///////////////////////////////////////////////////
    ///// Toast
    ///////////////////////////////////////////////////

    const fadeIn = function (view, duration, delay, complete: Function = null) {
        Tape.Box.tweenTo(view, { alpha: 1 }, duration, Tape.Box.Ease.quintOut, null, delay);
    }

    const fadeOut = function (view, duration, delay, complete: Function = null) {
        Tape.Box.tweenTo(view, { alpha: 0 }, duration, Tape.Box.Ease.quintOut, complete, delay);
    }

    /**
     * Toast
     */
    export class Toast {

        private static __toast_object__: Object = {};

        public static show(type: string, view, x: number, y: number, duration: number = 500, pivotX: number = 0.5, pivoxY: number = 0.5): void {
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                const list = this.__toast_object__[type];
                view.x = x;
                view.y = y;
                view.alpha = 0;
                view.pivot(view.width * pivotX, view.height * pivoxY);
                fadeIn(view, duration, 0);
                fadeOut(view, duration, duration, () => {
                    list.splice(list.indexOf(view), 1);
                    view.removeSelf();
                });
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

    ///////////////////////////////////////////////////
    ///// Task
    ///////////////////////////////////////////////////

    export class Task {

        private state = 'pending';
        private value = null;
        private callbacks = [];

        /**
         * fn: args -> resolve,reject
         */
        constructor(fn: Function) {
            var reject = (reason) => {
                this.state = 'rejected';
                this.value = reason;
                this.execute();
            }
            var resolve = (newValue) => {
                if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                    var then = newValue.then;
                    if (typeof then === 'function') {
                        try {
                            then.call(newValue, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                        return;
                    }
                }
                this.state = 'fulfilled';
                this.value = newValue;
                this.execute();
            }
            try {
                fn(resolve, reject);
            } catch (error) {
                reject(error);
            }
        }

        public then(onFulfilled: Function, onRejected: Function = null) {
            return new Task((resolve, reject) => {
                this.handle({
                    onFulfilled: onFulfilled || null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        }

        public catch(onRejected: Function) {
            return new Task((resolve, reject) => {
                this.handle({
                    onFulfilled: null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        }

        ///////////////////////////////////////
        ///// Private
        ///////////////////////////////////////

        private handle(callback) {
            if (this.state === 'pending') {
                this.callbacks.push(callback);
                return;
            }
            var cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
            if (cb === null) {
                cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
                cb(this.value);
                return;
            }
            try {
                var ret = cb(this.value);
                callback.resolve(ret);
            } catch (error) {
                callback.reject(error);
            }
        }

        private execute() {
            setTimeout(() => {
                this.callbacks.forEach((callback) => {
                    this.handle(callback);
                });
            }, 0);
        }
    }
}
