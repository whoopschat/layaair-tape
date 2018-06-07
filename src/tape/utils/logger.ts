// =========================== //
// Tape logger.js
// =========================== //
module Tape {

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
    
}