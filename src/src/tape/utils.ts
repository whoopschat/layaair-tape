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
     * EventBus
     */
    export class EventBus {

        private static __event_group__: Object = {};

        public static post(event: string, data: any) {
            if (!event) {
                return;
            }
            if (this.__event_group__.hasOwnProperty(event)) {
                const list: Array<Function> = this.__event_group__[event];
                if (list.length > 0) {
                    list.forEach(value => {
                        value && value(data);
                    })
                }
            }
        }

        public static on(event: string, callback: Function) {
            if (!event || !callback) {
                return;
            }
            if (!this.__event_group__.hasOwnProperty(event)) {
                this.__event_group__[event] = new Array();
            }
            const list = this.__event_group__[event];
            list.push(callback);
        }

    }

}
