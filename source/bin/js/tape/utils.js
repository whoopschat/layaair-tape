// utils
var Tape;
(function (Tape) {
    /**
     * Logger
     */
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
    Tape.Logger = Logger;
    /**
     * Toast
     */
    var Toast = /** @class */ (function () {
        function Toast() {
        }
        Toast.show = function (type, view, duration, widthRatio, heightRatio) {
            if (duration === void 0) { duration = 500; }
            if (widthRatio === void 0) { widthRatio = 0.5; }
            if (heightRatio === void 0) { heightRatio = 0.618; }
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                var list_1 = this.__toast_object__[type];
                view.x = Tape.Box.width() * widthRatio;
                view.y = Tape.Box.height() * heightRatio;
                view.alpha = 0;
                view.pivot(view.width / 2, view.height / 2);
                Tape.Box.tweenTo(view, { alpha: 1 }, duration, Tape.Box.Ease.quintOut);
                Tape.Box.tweenTo(view, { alpha: 0 }, duration, Tape.Box.Ease.quintIn, function () {
                    list_1.splice(list_1.indexOf(view), 1);
                    view.removeSelf();
                }, duration);
                Tape.Box.drawView(view);
                for (var i in list_1) {
                    if (list_1[i]) {
                        list_1[i].y -= list_1[i].height - 5;
                    }
                }
                list_1.push(view);
            }
        };
        Toast.__toast_object__ = {};
        return Toast;
    }());
    Tape.Toast = Toast;
})(Tape || (Tape = {}));
