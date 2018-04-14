// =========================== //
// tape utils.js
// =========================== //
var Tape;
(function (Tape) {
    ///////////////////////////////////////////////////
    ///// NumUtil
    ///////////////////////////////////////////////////
    var NumUtil = /** @class */ (function () {
        function NumUtil() {
        }
        NumUtil.rangedValue = function (val, min, max) {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        };
        NumUtil.rand = function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };
        return NumUtil;
    }());
    Tape.NumUtil = NumUtil;
    ///////////////////////////////////////////////////
    ///// LinkUtil
    ///////////////////////////////////////////////////
    var LinkUtil = /** @class */ (function () {
        function LinkUtil() {
        }
        LinkUtil.openURL = function (url) {
            window.location.href = url;
        };
        return LinkUtil;
    }());
    Tape.LinkUtil = LinkUtil;
    ///////////////////////////////////////////////////
    ///// UUID
    ///////////////////////////////////////////////////
    var UUID = /** @class */ (function () {
        function UUID() {
        }
        UUID.S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        UUID.guid = function () {
            return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
        };
        return UUID;
    }());
    Tape.UUID = UUID;
    ///////////////////////////////////////////////////
    ///// Logger
    ///////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////
    ///// Toast
    ///////////////////////////////////////////////////
    /**
     * Toast
     */
    var Toast = /** @class */ (function () {
        function Toast() {
        }
        Toast.show = function (type, view, x, y, duration, pivotX, pivoxY) {
            if (duration === void 0) { duration = 500; }
            if (pivotX === void 0) { pivotX = 0.5; }
            if (pivoxY === void 0) { pivoxY = 0.5; }
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                var list_1 = this.__toast_object__[type];
                view.x = x;
                view.y = y;
                view.alpha = 0;
                view.pivot(view.width * pivotX, view.height * pivoxY);
                this.fadeIn(view, duration, 0);
                this.fadeOut(view, duration, duration, function () {
                    list_1.splice(list_1.indexOf(view), 1);
                    view.removeSelf();
                });
                Tape.Box.drawView(view);
                for (var i in list_1) {
                    if (list_1[i]) {
                        list_1[i].y -= list_1[i].height - 5;
                    }
                }
                list_1.push(view);
            }
        };
        Toast.fadeIn = function (view, duration, delay, complete) {
            if (complete === void 0) { complete = null; }
            Tape.Box.tweenTo(view, { alpha: 1 }, duration, Tape.Box.Ease.quintOut, null, delay);
        };
        Toast.fadeOut = function (view, duration, delay, complete) {
            if (complete === void 0) { complete = null; }
            Tape.Box.tweenTo(view, { alpha: 0 }, duration, Tape.Box.Ease.quintOut, complete, delay);
        };
        Toast.__toast_object__ = {};
        return Toast;
    }());
    Tape.Toast = Toast;
    ///////////////////////////////////////////////////
    ///// Task
    ///////////////////////////////////////////////////
    var Task = /** @class */ (function () {
        /**
         * fn: args -> resolve,reject
         */
        function Task(fn) {
            var _this = this;
            this.state = 'pending';
            this.value = null;
            this.callbacks = [];
            var reject = function (reason) {
                _this.state = 'rejected';
                _this.value = reason;
                _this.execute();
            };
            var resolve = function (newValue) {
                if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                    var then = newValue.then;
                    if (typeof then === 'function') {
                        try {
                            then.call(newValue, resolve, reject);
                        }
                        catch (error) {
                            reject(error);
                        }
                        return;
                    }
                }
                _this.state = 'fulfilled';
                _this.value = newValue;
                _this.execute();
            };
            try {
                fn(resolve, reject);
            }
            catch (error) {
                reject(error);
            }
        }
        Task.prototype.then = function (onFulfilled, onRejected) {
            var _this = this;
            if (onRejected === void 0) { onRejected = null; }
            return new Task(function (resolve, reject) {
                _this.handle({
                    onFulfilled: onFulfilled || null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        };
        Task.prototype.catch = function (onRejected) {
            var _this = this;
            return new Task(function (resolve, reject) {
                _this.handle({
                    onFulfilled: null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        };
        ///////////////////////////////////////
        ///// Private
        ///////////////////////////////////////
        Task.prototype.handle = function (callback) {
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
            }
            catch (error) {
                callback.reject(error);
            }
        };
        Task.prototype.execute = function () {
            var _this = this;
            setTimeout(function () {
                _this.callbacks.forEach(function (callback) {
                    _this.handle(callback);
                });
            }, 0);
        };
        return Task;
    }());
    Tape.Task = Task;
})(Tape || (Tape = {}));
