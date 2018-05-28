// =========================== //
// tape utils.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * Build
     */
    var Build = /** @class */ (function () {
        function Build() {
        }
        /**
         * configEnv
         * @param env development or production
         */
        Build.configEnv = function (env) {
            this.__default_env__ = env;
        };
        /**
         * get build env
         * @return env mode : development or production
         */
        Build.getEnv = function () {
            if (this.__default_env__.indexOf('${') >= 0) {
                return 'development';
            }
            return this.__default_env__;
        };
        /**
         * isDebug
         */
        Build.isDebug = function () {
            return this.getEnv() !== 'production';
        };
        Build.__default_env__ = '${env}';
        return Build;
    }());
    Tape.Build = Build;
    /**
     * NumUtil
     */
    var NumUtil = /** @class */ (function () {
        function NumUtil() {
        }
        /**
         * rangedNum
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        NumUtil.rangedNum = function (val, min, max) {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        };
        /**
         * randomFloat
         * @param min min number default 0
         * @param max max number default 1
         */
        NumUtil.randomFloat = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            return Math.random() * (max - min) + min;
        };
        /**
         * randomInteger
         * @param min min number
         * @param max max number
         */
        NumUtil.randomInteger = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };
        return NumUtil;
    }());
    Tape.NumUtil = NumUtil;
    /**
     * LinkUtil
     */
    var LinkUtil = /** @class */ (function () {
        function LinkUtil() {
        }
        /**
         * openURL
         * @param url url
         */
        LinkUtil.openURL = function (url) {
            window.location.href = url;
        };
        return LinkUtil;
    }());
    Tape.LinkUtil = LinkUtil;
    /**
     * UUID
     */
    var UUID = /** @class */ (function () {
        function UUID() {
        }
        UUID._s4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        UUID.randomUUID = function () {
            return (this._s4() + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + this._s4() + this._s4());
        };
        return UUID;
    }());
    Tape.UUID = UUID;
    /**
     * Logger
     */
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        /**
         * setDebug
         */
        Logger.setDebug = function (debug) {
            this.__is_debug__ = debug;
        };
        /**
         * isDebug
         */
        Logger.isDebug = function () {
            return this.__is_debug__;
        };
        /**
         * log
         */
        Logger.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.log.apply(console, [message].concat(optionalParams));
        };
        /**
         * error
         */
        Logger.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.error.apply(console, [message].concat(optionalParams));
        };
        /**
         * info
         */
        Logger.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.info.apply(console, [message].concat(optionalParams));
        };
        /**
         * warn
         */
        Logger.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.warn.apply(console, [message].concat(optionalParams));
        };
        /**
         * debug
         */
        Logger.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.debug.apply(console, [message].concat(optionalParams));
        };
        Logger.__is_debug__ = Build.isDebug();
        return Logger;
    }());
    Tape.Logger = Logger;
    /**
     * Bus
     */
    var Bus = /** @class */ (function () {
        function Bus() {
        }
        Bus.post = function (event, data) {
            if (!event) {
                return;
            }
            if (this.__event_group__.hasOwnProperty(event)) {
                var list = this.__event_group__[event];
                if (list.length > 0) {
                    list.forEach(function (value) {
                        value && value(data);
                    });
                }
            }
        };
        Bus.on = function (event, callback) {
            if (!event || !callback) {
                return;
            }
            if (!this.__event_group__.hasOwnProperty(event)) {
                this.__event_group__[event] = new Array();
            }
            var list = this.__event_group__[event];
            list.push(callback);
        };
        Bus.__event_group__ = {};
        return Bus;
    }());
    Tape.Bus = Bus;
})(Tape || (Tape = {}));
