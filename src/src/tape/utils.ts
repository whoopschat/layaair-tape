// =========================== //
// tape utils.js
// =========================== //
module Tape {

    /**
     * Build
     */
    export class Build {

        private static __default_env__: string = '${env}';

        /**
         * configEnv
         * @param env development or production
         */
        public static configEnv(env: string) {
            this.__default_env__ = env;
        }

        /**
         * get build env
         * @return env mode : development or production
         */
        public static getEnv(): string {
            if (this.__default_env__.indexOf('${') >= 0) {
                return 'development';
            }
            return this.__default_env__;
        }

        /**
         * isDebug
         */
        public static isDebug(): boolean {
            return this.getEnv() !== 'production';
        }

    }

    /**
     * NumUtil
     */
    export class NumUtil {

        /**
         * rangedNum
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        public static rangedNum(val: number, min: number, max: number): number {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        }

        /**
         * randomFloat
         * @param min min number default 0
         * @param max max number default 1
         */
        public static randomFloat(min: number = 0, max: number = 1): number {
            return Math.random() * (max - min) + min;
        }

        /**
         * randomInteger
         * @param min min number
         * @param max max number
         */
        public static randomInteger(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min) + min);
        }

    }

    /**
     * LinkUtil
     */
    export class LinkUtil {

        /**
         * openURL
         * @param url url
         */
        public static openURL(url: string) {
            window.location.href = url;
        }

    }

    /**
     * UUID
     */
    export class UUID {

        private static _s4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        public static randomUUID() {
            return (this._s4() + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + this._s4() + this._s4());
        }

    }

    /**
     * Logger
     */
    export class Logger {

        private static __is_debug__: Boolean = Build.isDebug();

        /**
         * setDebug
         */
        public static setDebug(debug: Boolean) {
            this.__is_debug__ = debug;
        }

        /**
         * isDebug
         */
        public static isDebug(): Boolean {
            return this.__is_debug__;
        }

        /**
         * log
         */
        public static log(message?: any, ...optionalParams: any[]) {
            if (!this.isDebug()) {
                return;
            }
            console.log(message, ...optionalParams);
        }

        /**
         * error
         */
        public static error(message?: any, ...optionalParams: any[]) {
            if (!this.isDebug()) {
                return;
            }
            console.error(message, ...optionalParams);
        }

        /**
         * info
         */
        public static info(message?: any, ...optionalParams: any[]) {
            if (!this.isDebug()) {
                return;
            }
            console.info(message, ...optionalParams);
        }

        /**
         * warn
         */
        public static warn(message?: any, ...optionalParams: any[]) {
            if (!this.isDebug()) {
                return;
            }
            console.warn(message, ...optionalParams);
        }

        /**
         * debug
         */
        public static debug(message?: any, ...optionalParams: any[]) {
            if (!this.isDebug()) {
                return;
            }
            console.debug(message, ...optionalParams);
        }
    }

    /**
     * Task
     */
    export class Task {

        private __state__ = 'pending';
        private __value__ = null;
        private __callbacks__ = [];

        /**
         * new Task()
         * @param func args[resolve,reject]
         */
        constructor(func: Function) {
            var reject = (reason) => {
                this.__state__ = 'rejected';
                this.__value__ = reason;
                this._execute();
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
                this.__state__ = 'fulfilled';
                this.__value__ = newValue;
                this._execute();
            }
            try {
                func(resolve, reject);
            } catch (error) {
                reject(error);
            }
        }

        /**
         * then
         * @param onFulfilled onFulfilled
         * @param onRejected onRejected
         */
        public then(onFulfilled: Function, onRejected: Function = null) {
            return new Task((resolve, reject) => {
                this._handle({
                    onFulfilled: onFulfilled || null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        }

        /**
         * catch
         * @param onRejected onRejected
         */
        public catch(onRejected: Function) {
            return new Task((resolve, reject) => {
                this._handle({
                    onFulfilled: null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        }

        private _handle(callback) {
            if (this.__state__ === 'pending') {
                this.__callbacks__.push(callback);
                return;
            }
            var cb = this.__state__ === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
            if (cb === null) {
                cb = this.__state__ === 'fulfilled' ? callback.resolve : callback.reject;
                cb(this.__value__);
                return;
            }
            try {
                var ret = cb(this.__value__);
                callback.resolve(ret);
            } catch (error) {
                callback.reject(error);
            }
        }

        private _execute() {
            setTimeout(() => {
                this.__callbacks__.forEach((callback) => {
                    this._handle(callback);
                });
            }, 0);
        }

    }
}
