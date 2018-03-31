// logger
var Topspeed;
(function (Topspeed) {
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        Logger.setDebug = function (debug) {
            this.__is_debug__ = debug;
        };
        Logger.isDebug = function () {
            return this.__is_debug__;
        };
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
        Logger.__is_debug__ = true;
        return Logger;
    }());
    Topspeed.Logger = Logger;
})(Topspeed || (Topspeed = {}));
