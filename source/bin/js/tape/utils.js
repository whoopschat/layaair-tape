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
            if (window.hasOwnProperty('__build_process_env__')) {
                return window['__build_process_env__']['MODE'] || 'development';
            }
            if (window.hasOwnProperty('process')
                && window['process'].hasOwnProperty('env')
                && window['process']['env'].hasOwnProperty('NODE_ENV')) {
                return window['process']['env']['NODE_ENV'] || 'development';
            }
            return this.__default_env__;
        };
        /**
         * isDebug
         */
        Build.isDebug = function () {
            return this.getEnv() !== 'production';
        };
        Build.__default_env__ = 'development';
        return Build;
    }());
    Tape.Build = Build;
    /**
     * FrameInterval
     */
    var FrameInterval = /** @class */ (function () {
        function FrameInterval() {
            this.__callback__ = null;
            this.__start_date__ = null;
            this.__offset__ = 0;
        }
        /**
         * start
         * @param delay frame
         * @param callback callback:time
         * @param offset time offset
         */
        FrameInterval.prototype.start = function (delay, callback, offset) {
            if (offset === void 0) { offset = 0; }
            this.__callback__ = callback;
            this.__start_date__ = new Date();
            this.__offset__ = offset;
            Laya.timer.loop(delay, this, this.loop);
        };
        FrameInterval.prototype.loop = function () {
            var now = new Date();
            this.__callback__ && this.__callback__(now.getTime() - this.__start_date__.getTime() + this.__offset__);
        };
        /**
         * stop
         */
        FrameInterval.prototype.stop = function () {
            Laya.timer.clear(this, this.loop);
        };
        return FrameInterval;
    }());
    Tape.FrameInterval = FrameInterval;
    /**
     * TimerInterval
     */
    var TimerInterval = /** @class */ (function () {
        function TimerInterval() {
            this.__interval__ = 0;
            this.__start_date__ = null;
            this.__offset__ = 0;
        }
        /**
         * start
         * @param delay millis
         * @param callback callback:time
         * @param offset time offset
         */
        TimerInterval.prototype.start = function (delay, callback, offset) {
            var _this = this;
            if (offset === void 0) { offset = 0; }
            this.__start_date__ = new Date();
            this.__offset__ = offset;
            this.__interval__ = setInterval(function () {
                var now = new Date();
                callback && callback(now.getTime() - _this.__start_date__.getTime() + _this.__offset__);
            }, delay);
        };
        /**
         * stop
         */
        TimerInterval.prototype.stop = function () {
            clearInterval(this.__interval__);
        };
        return TimerInterval;
    }());
    Tape.TimerInterval = TimerInterval;
    /**
     * NumUtil
     */
    var NumUtil = /** @class */ (function () {
        function NumUtil() {
        }
        /**
         * rangedValue
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        NumUtil.rangedValue = function (val, min, max) {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        };
        /**
         * rand
         * @param min min number
         * @param max max number
         */
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
        UUID.randUUID = function () {
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
     * Task
     */
    var Task = /** @class */ (function () {
        /**
         * new Task()
         * @param func args[resolve,reject]
         */
        function Task(func) {
            var _this = this;
            this.__state__ = 'pending';
            this.__value__ = null;
            this.__callbacks__ = [];
            var reject = function (reason) {
                _this.__state__ = 'rejected';
                _this.__value__ = reason;
                _this._execute();
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
                _this.__state__ = 'fulfilled';
                _this.__value__ = newValue;
                _this._execute();
            };
            try {
                func(resolve, reject);
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
                _this._handle({
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
                _this._handle({
                    onFulfilled: null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        };
        Task.prototype._handle = function (callback) {
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
            }
            catch (error) {
                callback.reject(error);
            }
        };
        Task.prototype._execute = function () {
            var _this = this;
            setTimeout(function () {
                _this.__callbacks__.forEach(function (callback) {
                    _this._handle(callback);
                });
            }, 0);
        };
        return Task;
    }());
    Tape.Task = Task;
})(Tape || (Tape = {}));
