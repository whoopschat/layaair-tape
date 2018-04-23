// =========================== //
// tape utils.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * Timer
     */
    var Timer = /** @class */ (function () {
        function Timer() {
            this.__loop_runing__ = false;
            this.__loop_callback__ = null;
            this.__loop_date__ = null;
        }
        Timer.sleep = function (numberMillis) {
            var now = new Date();
            var exitTime = now.getTime() + numberMillis;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime)
                    return;
            }
        };
        Timer.prototype.loop = function (callback, delay) {
            var _this = this;
            this.__loop_callback__ = callback;
            this.__loop_runing__ = true;
            this.__loop_date__ = new Date();
            new Tape.Task(function (resolve) {
                while (_this.__loop_runing__) {
                    var now = new Date();
                    callback && callback(now.getTime() - _this.__loop_date__.getTime());
                    Timer.sleep(delay);
                }
                resolve();
            }).then(function () {
                _this.__loop_callback__ = null;
                _this.__loop_runing__ = false;
                _this.__loop_date__ = null;
            });
        };
        Timer.prototype.stop = function () {
            this.__loop_runing__ = false;
        };
        return Timer;
    }());
    Tape.Timer = Timer;
    /**
     * NumUtil
     */
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
    /**
     * LinkUtil
     */
    var LinkUtil = /** @class */ (function () {
        function LinkUtil() {
        }
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
        UUID.S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        UUID.randUUID = function () {
            return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
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
        Logger.__is_debug__ = true;
        return Logger;
    }());
    Tape.Logger = Logger;
    /**
     * Task
     */
    var Task = /** @class */ (function () {
        /**
         * constructor
         * @param fn args -> resolve,reject
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
        /**
         * then
         * @param onFulfilled onFulfilled
         * @param onRejected onRejected
         */
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
        /**
         * catch
         * @param onRejected onRejected
         */
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
