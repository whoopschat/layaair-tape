// logger
module Topspeed {

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
}
